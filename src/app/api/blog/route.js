import { NextResponse } from "next/server";
import { Blog } from "@/lib/models/blog.model.js";
import { BlogContent } from "@/lib/models/blogContent.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const blogs = await Blog.find().populate("content").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
