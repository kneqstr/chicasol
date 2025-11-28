import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  thumbnailUrl?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnailUrl: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
