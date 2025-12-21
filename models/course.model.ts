import mongoose, { Document, Schema, Types } from "mongoose";
import { MultilangText } from "@/types/common";

export type UserCourseLean = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  course: {
    _id: Types.ObjectId;
    name: string;
    title: MultilangText;
    subtitle: MultilangText;
    description: MultilangText;
    price: number;
    thumbnailUrl: string;
    mainImage: string;
    previewVideo: string;
    isPublished: boolean;
  };
  purchasedAt: Date;
  progress: number;
  completedLessons: string[];
  isCompleted: boolean;
  isActive: boolean;
};

export interface ICourse extends Document {
  name: string;
  title: MultilangText;
  subtitle: MultilangText;
  description: MultilangText;
  price: number;
  thumbnailUrl: string;
  mainImage: string;
  previewVideo: string;
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
    subtitle: { type: MultilangSchema, required: true },
    description: { type: MultilangSchema, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnailUrl: { type: String },
    mainImage: { type: String },
    previewVideo: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
