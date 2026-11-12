import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/index.js";
import { Blog } from "@/lib/models/blog.model.js";

export async function POST(req, context) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { name, email, comment } = body;

    if (!name || !comment) {
      return NextResponse.json(
        { error: "Name and comment are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const newComment = {
      name: name.trim(),
      email: (email || "").trim(),
      comment: comment.trim(),
      createdAt: new Date(),
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { error: "Blog not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Comment posted successfully.", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting blog comment:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

