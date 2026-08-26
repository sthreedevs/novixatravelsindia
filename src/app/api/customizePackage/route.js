import { NextResponse } from "next/server";
import { CustomizePackage } from "@/lib/models/customizePackage.model.js";
import { Package } from "@/lib/models/package.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const PackageEnquiries = await CustomizePackage.find().populate("packageId");

    return NextResponse.json({
      success: true,
      PackageEnquiries,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
