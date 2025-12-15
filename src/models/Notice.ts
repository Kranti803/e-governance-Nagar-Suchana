import mongoose, { Schema } from "mongoose";

export type NoticeCategory = "GENERAL" | "TAX" | "HEALTH" | "EVENTS";

export interface INotice extends mongoose.Document {
  title: string;
  summary: string;
  content: string;
  category: NoticeCategory;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["GENERAL", "TAX", "HEALTH", "EVENTS"],
      required: true,
    },
    publishDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Notice =
  mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);

