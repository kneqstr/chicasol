import mongoose, { Document, Schema, Types } from "mongoose";

export interface IComment extends Document {
  content: string;
  userId: Types.ObjectId;
  videoId?: Types.ObjectId;
  postId?: Types.ObjectId;
  parentCommentId?: Types.ObjectId | null;
  likes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    videoId: { type: Schema.Types.ObjectId, ref: "Video" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true },
);

CommentSchema.index({ videoId: 1 });
CommentSchema.index({ postId: 1 });

export default mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
