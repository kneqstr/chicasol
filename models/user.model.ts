import mongoose, { Document, Schema } from "mongoose";

type UserRole = "user" | "moderator" | "admin";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  phone: string;
  city: string;
  avatarUrl: string;
  roles: UserRole[];
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
      sparse: true,
    },
    city: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    roles: {
      type: [String],
      enum: ["user", "moderator", "admin"],
      default: ["user"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
