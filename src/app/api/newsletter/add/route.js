import { NextResponse } from "next/server";
import { Newsletter } from "@/lib/models/newsletter.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const externalLink = formData.get("externalLink");
    const file = formData.get("image");

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }

    let uploadedImage = "";
    if (file && file.size > 0) {
      const uploadRes = await uploadOnCloudinary(file);
      if (!uploadRes?.secure_url) {
        return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
      }
      uploadedImage = uploadRes.secure_url;
    }

    const newsletter = await Newsletter.create({
      title,
      description,
      externalLink,
      image: uploadedImage,
    });

    return NextResponse.json(
      { success: true, message: "Newsletter created successfully", data: newsletter },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
