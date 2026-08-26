import { NextResponse } from "next/server";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";
import { deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const carousel = await Carousel.findById(id);
    if (!carousel) {
      return NextResponse.json({ error: "Carousel not found" }, { status: 404 });
    }

    if (carousel.image) {
      await deleteFromCloudinary(carousel.image);
    }

    await carousel.deleteOne();

    return NextResponse.json(
      { success: true, message: "Carousel deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
