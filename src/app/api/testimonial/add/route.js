import { NextResponse } from "next/server";
import { Testimonial } from "@/lib/models/testimonial.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const name = formData.get("name");
    const designation = formData.get("designation");
    const review = formData.get("review");
    const file = formData.get("image"); // This was upload.single("image")

    if (!name || !designation || !review) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    let uploadedImage = "";
    if (file && file.size > 0) {
      const uploadRes = await uploadOnCloudinary(file);
      if (!uploadRes?.secure_url) {
        return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
      }
      uploadedImage = uploadRes.secure_url;
    } else {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    const testimonial = await Testimonial.create({
      name,
      designation,
      review,
      image: uploadedImage,
    });

    return NextResponse.json(
      { success: true, message: "Testimonial created successfully", data: testimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("Testimonial POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
