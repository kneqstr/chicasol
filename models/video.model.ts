import mongoose, { Document, Schema, Types } from "mongoose";
import { MultilangText } from "@/types/common";

export interface IVideo extends Document {
  slug: string;
  videoId: string;
  title: MultilangText;
  description: MultilangText;
  subdescription: MultilangText;
  tags: MultilangText[];
  durationMinutes: number;
  likes: number;
  views: number;
  order: number;
  courseId: Types.ObjectId;
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

const VideoSchema = new Schema<IVideo>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    videoId: { type: String, required: true, unique: true },
    title: { type: MultilangSchema, required: true },
    description: { type: MultilangSchema, required: true },
    subdescription: { type: MultilangSchema, required: true },
    tags: { type: [MultilangSchema], default: [] },
    durationMinutes: { type: Number, required: true, min: 0 },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    order: { type: Number, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);
