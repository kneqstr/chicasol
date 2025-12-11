import mongoose, { Document, Schema } from "mongoose";
import { MultilangText } from "@/types/common";

export interface ICourse extends Document {
  name: string;
  title: MultilangText;
  description: MultilangText;
  price: number;
  thumbnailUrl?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MultilangSchema = new Schema<MultilangText>(
  {
    ru: { type: String, required: true },
    uk: { type: String, required: true },
  },
  { _id: false },
);

const CourseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true, unique: true },
    title: { type: MultilangSchema, required: true },
    description: { type: MultilangSchema, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnailUrl: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
