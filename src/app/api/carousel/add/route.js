import { NextResponse } from "next/server";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const buttonText = formData.get("buttonText");
    const file = formData.get("image");

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "Image is required." }, { status: 400 });
    }

    const uploadRes = await uploadOnCloudinary(file);
    if (!uploadRes?.secure_url) {
      return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
    }

    const carousel = await Carousel.create({
      title,
      description,
      buttonText,
      image: uploadRes.secure_url,
      type: "homepage",
    });

    return NextResponse.json(
      { success: true, message: "Carousel created successfully", data: carousel },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
