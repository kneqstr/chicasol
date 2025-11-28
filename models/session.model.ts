import mongoose, { Schema, Document } from "mongoose";

interface ISession extends Document {
  user: mongoose.Types.ObjectId;
  refreshToken: string;
  userAgent?: string;
  ip?: string;
  createdAt: Date;
  expiresAt: Date;
  revoked: boolean;
}

const SessionSchema = new Schema<ISession>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    refreshToken: { type: String, required: true, index: true },
    userAgent: { type: String },
    ip: { type: String },
    expiresAt: { type: Date, required: true, index: true },
    revoked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);
