import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  phone: string;
  city: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "Користувач",
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
    },
    city: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
