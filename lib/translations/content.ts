"use server";

import contentModel, { ContentUnion } from "@/models/content.model";
import { connectDB } from "../db";

export async function getPageContent(page: string, lang: "uk" | "ru") {
  await connectDB();
  const blocks = await contentModel.find({ page }).lean();

  const normalized = blocks.reduce(
    (acc, block) => {
      acc[block.key] = block.content[lang];
      return acc;
    },
    {} as Record<string, ContentUnion>,
  );
  return normalized;
}
