import { Blog } from "@/lib/models/blog.model.js";
import { BlogContent } from "@/lib/models/blogContent.model.js";
import { connectDB } from "@/lib/db/index.js";
import mongoose from "mongoose";
import "@/lib/models/index.js";

export async function getBlogs() {
  await connectDB();
  const blogs = await Blog.find().populate("content").sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(blogs));
}

export async function getBlogBySlug(slug) {
  await connectDB();
  
  let blog;
  if (mongoose.Types.ObjectId.isValid(slug) && slug.length === 24) {
    blog = await Blog.findById(slug).populate("content").lean();
  }

  if (!blog) {
    blog = await Blog.findOne({ slug }).populate("content").lean();
  }

  if (!blog) {
    return null;
  }

  return JSON.parse(JSON.stringify(blog));
}
