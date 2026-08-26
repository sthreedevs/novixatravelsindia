import { NextResponse } from "next/server";
import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { connectDB } from "@/lib/db/index.js";
import { deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const dayTrip = await DayTrip.findById(id);
    if (!dayTrip) return NextResponse.json({ error: "Day Trip not found." }, { status: 404 });

    if (dayTrip.thumbnail) {
      await deleteFromCloudinary(dayTrip.thumbnail);
    }

    await dayTrip.deleteOne();

    return NextResponse.json({ success: true, message: "Day Trip deleted successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
