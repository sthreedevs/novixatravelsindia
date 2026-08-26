import { NextResponse } from "next/server";
import { Hotel } from "@/lib/models/hotel.model.js";
import { connectDB } from "@/lib/db/index.js";
import { deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    if (hotel.thumbnail) {
      await deleteFromCloudinary(hotel.thumbnail);
    }

    await hotel.deleteOne();

    return NextResponse.json(
      { success: true, message: "Hotel deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
