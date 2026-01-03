import mongoose, { Schema, Document } from "mongoose";
import { MultilangText } from "@/types/common";
export type BlogBlockType = "h2" | "h3" | "h4" | "text" | "image" | "tags";
export interface IBlogBlock {
  type: BlogBlockType;
  content?: MultilangText;
  tags?: string[];
  imageUrl?: string;
  order: number;
}
export interface IBlog extends Document {
  title: MultilangText;
  slug: string;
  blocks: IBlogBlock[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  authorId: string;
}
const MultilangSchema = new Schema<MultilangText>(
  {
    ru: { type: String, default: "" },
    uk: { type: String, default: "" },
  },
  { _id: false },
);
const BlogBlockSchema = new Schema<IBlogBlock>(
  {
    type: { type: String, required: true, enum: ["h2", "h3", "h4", "text", "image", "tags"] },
    content: { type: MultilangSchema },
    tags: [String],
    imageUrl: String,
    order: { type: Number, required: true },
  },
  { _id: false },
);
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: MultilangSchema, required: true },
    slug: { type: String, required: true, unique: true },
    blocks: { type: [BlogBlockSchema], default: [] },
    views: { type: Number, default: 0 },
    authorId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
BlogSchema.index({ views: -1 });
BlogSchema.index({ createdAt: -1 });
export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);