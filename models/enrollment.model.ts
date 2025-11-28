import mongoose, { Document, Schema } from "mongoose";

export interface IEnrollment extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  activatedAt: Date;
  expiresAt: Date;
  disabled: boolean;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", requied: true },
    activatedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    disabled: { type: Boolean },
  },
  { timestamps: true },
);

export default mongoose.models.Enrollment ||
  mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
