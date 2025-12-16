import mongoose, { Document, Schema, Types } from "mongoose";

export type PaymentStatus = "pending" | "paid" | "failed" | "expired" | "refunded";

export interface IPurchase extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;

  amount: number;
  currency: "UAH" | "USD";
  status: PaymentStatus;

  wayforpayOrderReference: string;
  wayforpayTransactionId?: string;
  paidAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const PurchaseSchema = new Schema<IPurchase>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    amount: { type: Number, required: true },
    currency: { type: String, default: "UAH" },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "expired", "refunded"],
      default: "pending",
      index: true,
    },

    wayforpayOrderReference: { type: String, required: true, unique: true },
    wayforpayTransactionId: { type: String },

    paidAt: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.models.Purchase || mongoose.model<IPurchase>("Purchase", PurchaseSchema);
