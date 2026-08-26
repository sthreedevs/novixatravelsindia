import mongoose from "mongoose";

const blogContent = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export const BlogContent = mongoose.models.BlogContent || mongoose.model("BlogContent", blogContent);
