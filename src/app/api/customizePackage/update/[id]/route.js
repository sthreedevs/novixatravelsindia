import { NextResponse } from "next/server";
import { CustomizePackage } from "@/lib/models/customizePackage.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    const customizePackage = await CustomizePackage.findById(id);
    if (!customizePackage) {
      return NextResponse.json({ error: "Customize Package enquiry not found" }, { status: 404 });
    }

    const body = await request.json();
    const { packageId, name, email, phone, days, nights, specialRequest } = body;

    customizePackage.packageId = packageId ?? customizePackage.packageId;
    customizePackage.name = name ?? customizePackage.name;
    customizePackage.email = email ?? customizePackage.email;
    customizePackage.phone = phone ?? customizePackage.phone;
    customizePackage.days = days ?? customizePackage.days;
    customizePackage.nights = nights ?? customizePackage.nights;
    customizePackage.specialRequest = specialRequest ?? customizePackage.specialRequest;

    const updatedCustomizePackage = await customizePackage.save();

    return NextResponse.json({
      success: true,
      message: "Customize Package enquiry updated successfully",
      data: updatedCustomizePackage,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
