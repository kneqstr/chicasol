import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUserCourse extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;

  purchasedAt: Date;
  progress: number;
  completedLessons: string[];
  isCompleted: boolean;
}

const UserCourseSchema = new Schema<IUserCourse>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    purchasedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completedLessons: { type: [String], default: [] },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserCourseSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.models.UserCourse ||
  mongoose.model<IUserCourse>("UserCourse", UserCourseSchema);
