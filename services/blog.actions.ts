"use server";
import Blog from "@/models/blog.model";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import type { IBlogBlock, BlogBlockType } from "@/models/blog.model";
import { MultilangText } from "@/types/common";
import { headers } from "next/headers";
import crypto from "crypto";
import redis from "@/lib/redis";
interface ProcessedBlock {
  type: string;
  content?: MultilangText;
  tags?: { ru: string[]; uk: string[] };
  imageUrl?: string;
  order: number;
}
export async function createBlogPost(formData: FormData) {
  try {
    const titleRu = formData.get("title_ru") as string;
    const titleUk = formData.get("title_uk") as string;
    if (!titleRu || !titleUk) {
      return {
        success: false,
      };
    }
    const authorId = "admin";
    const slugRu = slugify(titleRu, {
      trim: true,
      lower: true,
      locale: "ru",
      remove: /[^a-z0-9 -]/gi,
    });
    const uniqueSlug = slugRu + Math.round(Math.random() * 100);
    const blocksJson = formData.get("blocks") as string;
    const blocks: ProcessedBlock[] = JSON.parse(blocksJson);
    const processedBlocks: IBlogBlock[] = [];
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const processedBlock: IBlogBlock = {
        type: block.type as BlogBlockType,
        order: block.order,
      };
      if (block.type === "image") {
        if (block.imageUrl) {
          processedBlock.imageUrl = block.imageUrl;
        } else {
          throw new Error(`Image URL missing for block ${i}`);
        }
      } else if (block.type === "tags") {
        processedBlock.tags = [...(block.tags?.ru || []), ...(block.tags?.uk || [])];
      } else if (block.content) {
        processedBlock.content = block.content;
      }
      processedBlocks.push(processedBlock);
    }
    const blogPost = await Blog.create({
      title: { ru: titleRu, uk: titleUk },
      slug: uniqueSlug,
      blocks: processedBlocks,
      authorId,
      views: 0,
    });
    
    revalidatePath("/blog");
    revalidatePath(`/blog/${uniqueSlug}`);
    return {
      success: true,
      id: blogPost._id.toString(),
      slug: uniqueSlug,
    };
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw new Error("Failed to create blog post");
  }
}

export async function updateViews(slug: string) {
  const VIEW_TTL = 60 * 60 * 24;
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] ??
      headersList.get("x-real-ip") ??
      "unknown";

    const fingerprint = crypto
      .createHash("sha256")
      .update(ip)
      .digest("hex");

    const redisKey = `blog:view:${slug}:${fingerprint}`;

   const wasSet = await redis.set(redisKey, "1", "EX", VIEW_TTL, "NX");

    if (!wasSet) {
      return { counted: false };
    }

    await Blog.findOneAndUpdate({ slug }, {
      $inc: { views: 1 },
    });

    return { counted: true };
  } catch (error) {
    console.error("updateViews error:", error);
    return { counted: false };
  }

}