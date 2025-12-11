"use server";

import Blog from "@/models/blog.model";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import type { IBlogBlock, MultilangText, BlogBlockType } from "@/models/blog.model";
import { uploadToBunnyCDN } from "@/lib/bunny";

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
        const file = formData.get(`file_${i}`) as File | null;

        if (file && file.size > 0) {
          const uniquePrefix = Date.now() + Math.round(Math.random() * 100);
          const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "-");
          const storagePath = `blog/${uniquePrefix}-${safeName}`;

          const cdnUrl = await uploadToBunnyCDN(file, storagePath);
          processedBlock.imageUrl = cdnUrl;
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
