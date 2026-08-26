import { NextResponse } from "next/server";
import { Blog } from "@/lib/models/blog.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const author = formData.get("author");
    let content = formData.get("content");
    const file = formData.get("image");

    if (!title || !description || !author) {
      return NextResponse.json({ error: "Title, description and author are required." }, { status: 400 });
    }

    if (content) {
      if (typeof content === "string") {
        try {
          content = JSON.parse(content);
        } catch {
          content = content.split(",").map((id) => id.trim());
        }
      }
    }

    let uploadedImage = "";
    if (file && file.size > 0) {
      const uploadRes = await uploadOnCloudinary(file);
      if (!uploadRes?.secure_url) {
        return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
      }
      uploadedImage = uploadRes.secure_url;
    }

    const blog = await Blog.create({
      title,
      description,
      author,
      content,
      image: uploadedImage,
    });

    return NextResponse.json(
      { success: true, message: "Blog created successfully", data: blog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
