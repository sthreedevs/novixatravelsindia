import { NextResponse } from "next/server";
import { Testimonial } from "@/lib/models/testimonial.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const formData = await request.formData();
    const name = formData.get("name");
    const designation = formData.get("designation");
    const review = formData.get("review");
    const file = formData.get("image");

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    let updatedImage = testimonial.image;
    if (file && file.size > 0) {
      const uploadRes = await uploadOnCloudinary(file);
      if (!uploadRes?.secure_url) {
        return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
      }
      if (testimonial.image && testimonial.image !== uploadRes.secure_url) {
        await deleteFromCloudinary(testimonial.image);
      }
      updatedImage = uploadRes.secure_url;
    }

    testimonial.name = name ?? testimonial.name;
    testimonial.designation = designation ?? testimonial.designation;
    testimonial.review = review ?? testimonial.review;
    testimonial.image = updatedImage;

    const updatedTestimonial = await testimonial.save();

    return NextResponse.json(
      { success: true, message: "Testimonial updated successfully", data: updatedTestimonial },
      { status: 200 }
    );
  } catch (error) {
    console.error("Testimonial PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
