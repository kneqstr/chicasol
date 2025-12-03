import mongoose, { Document, Schema, Types } from "mongoose";

interface IContentObject {
  title?: string;
  subtitle?: string;
  description?: string;
  subdescription?: string;
  footer?: string;
  url?: string;
  label?: string;
  price?: string;
}

export type ContentUnion = string | string[] | IContentObject | IContentObject[];

interface IContent {
  uk: ContentUnion;
  ru: ContentUnion;
}

export interface IContentSchema extends Document {
  _id: Types.ObjectId;
  key: string;
  page: string;
  type: string;
  content: IContent;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContentSchema>(
  {
    key: { type: String, required: true, unique: true },
    page: { type: String, required: true },
    type: { type: String, default: "text" },
    content: {
      uk: { type: Schema.Types.Mixed, required: true },
      ru: { type: Schema.Types.Mixed, required: true },
    },
  },
  { timestamps: true },
);

export default mongoose.models.Content || mongoose.model<IContentSchema>("Content", ContentSchema);
