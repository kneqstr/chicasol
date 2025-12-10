import mongoose, { Schema, Document } from "mongoose";

export type BlogBlockType = "h2" | "h3" | "h4" | "text" | "image" | "tags";

export interface MultilangText {
  ru: string;
  uk: string;
}

export interface IBlogBlock {
  type: BlogBlockType;
  content?: MultilangText;
  tags?: string[];
  imageUrl?: string;
  order: number;
}

export interface IBlog extends Document {
  title: MultilangText;
  slug: MultilangText;
  blocks: IBlogBlock[];
  createdAt: Date;
  updatedAt: Date;
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
    slug: { type: MultilangSchema, required: true, unique: true },
    blocks: { type: [BlogBlockSchema], default: [] },
    authorId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

BlogSchema.index({ "slug.ru": 1 });
BlogSchema.index({ "slug.uk": 1 });
BlogSchema.index({ authorId: 1 });
BlogSchema.index({ createdAt: -1 });

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
