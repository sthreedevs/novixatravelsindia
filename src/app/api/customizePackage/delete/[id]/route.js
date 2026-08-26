import { NextResponse } from "next/server";
import { CustomizePackage } from "@/lib/models/customizePackage.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    const enquiry = await CustomizePackage.findById(id);
    if (!enquiry) {
      return NextResponse.json({ error: "Customize Package enquiry not found" }, { status: 404 });
    }

    await enquiry.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Customize Package enquiry deleted successfully",
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
