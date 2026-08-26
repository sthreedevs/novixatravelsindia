import { NextResponse } from "next/server";
import { Blog } from "@/lib/models/blog.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const blogs = await Blog.find({ author: "Novixa Travels India" })
      .select("title thumbnail createdAt author")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    if (!blogs?.length) {
      return NextResponse.json({
        success: false,
        message: "No blogs found for Novixa Travels India",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
