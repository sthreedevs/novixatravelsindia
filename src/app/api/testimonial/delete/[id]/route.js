import { NextResponse } from "next/server";
import { Testimonial } from "@/lib/models/testimonial.model.js";
import { connectDB } from "@/lib/db/index.js";
import { deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    if (testimonial.image) {
      await deleteFromCloudinary(testimonial.image);
    }

    await testimonial.deleteOne();

    return NextResponse.json(
      { success: true, message: "Testimonial deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Testimonial DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
