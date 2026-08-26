import { NextResponse } from "next/server";
import { Newsletter } from "@/lib/models/newsletter.model.js";
import { connectDB } from "@/lib/db/index.js";
import { deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const record = await Newsletter.findById(id);
    if (!record) {
      return NextResponse.json({ error: "Newsletter not found" }, { status: 404 });
    }

    if (record.image) {
      await deleteFromCloudinary(record.image);
    }

    await record.deleteOne();

    return NextResponse.json(
      { success: true, message: "Newsletter deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
