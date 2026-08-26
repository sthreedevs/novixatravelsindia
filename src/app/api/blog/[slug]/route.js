import { NextResponse } from "next/server";
import { Blog } from "@/lib/models/blog.model.js";
import { BlogContent } from "@/lib/models/blogContent.model.js";
import { connectDB } from "@/lib/db/index.js";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;

    let blog;
    if (mongoose.Types.ObjectId.isValid(slug) && slug.length === 24) {
      blog = await Blog.findById(slug).populate("content");
    }

    if (!blog) {
      blog = await Blog.findOne({ slug }).populate("content");
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
