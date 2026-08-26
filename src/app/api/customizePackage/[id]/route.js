import { NextResponse } from "next/server";
import { CustomizePackage } from "@/lib/models/customizePackage.model.js";
import { Package } from "@/lib/models/package.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const enquiry = await CustomizePackage.findById(id).populate("packageId");

    if (!enquiry) {
      return NextResponse.json({ error: "Customize Package enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      enquiry,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
