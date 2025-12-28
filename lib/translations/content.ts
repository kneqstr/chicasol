"use server";

import contentModel, { ContentUnion } from "@/models/content.model";
import { connectDB } from "../db";
import { Language } from "./language";

export async function getPageContent(page: string, lang: Language) {
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
