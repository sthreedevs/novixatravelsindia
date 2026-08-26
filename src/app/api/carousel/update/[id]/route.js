import { NextResponse } from "next/server";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const buttonText = formData.get("buttonText");
    const file = formData.get("image");

    const carousel = await Carousel.findById(id);
    if (!carousel) {
      return NextResponse.json({ error: "Carousel not found" }, { status: 404 });
    }

    let updatedImage = carousel.image;
    if (file && file.size > 0) {
      const uploadRes = await uploadOnCloudinary(file);
      if (!uploadRes?.secure_url) {
        return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
      }
      if (carousel.image && carousel.image !== uploadRes.secure_url) {
        await deleteFromCloudinary(carousel.image);
      }
      updatedImage = uploadRes.secure_url;
    }

    carousel.title = title || carousel.title;
    carousel.description = description || carousel.description;
    carousel.buttonText = buttonText || carousel.buttonText;
    carousel.image = updatedImage;

    const updated = await carousel.save();

    return NextResponse.json(
      { success: true, message: "Carousel updated successfully", data: updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
