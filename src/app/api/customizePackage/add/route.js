import { NextResponse } from "next/server";
import { CustomizePackage } from "@/lib/models/customizePackage.model.js";
import { Package } from "@/lib/models/package.model.js";
import { connectDB } from "@/lib/db/index.js";
import { sendCreatedEnquiry, sendEnquiryNotificationToAdmin } from "@/lib/utils/emailService.js";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { packageId, name, email, phone, days, nights, specialRequest } = body;

    if (!packageId || !name || !email || !phone || !days || !nights || !specialRequest) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const packageExists = await Package.findById(packageId);
    if (!packageExists) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const newCustomizePackageEnquiry = await CustomizePackage.create({
      packageId,
      name,
      email,
      phone,
      days,
      nights,
      specialRequest,
    });

    if (newCustomizePackageEnquiry) {
      await sendCreatedEnquiry(email);
      await sendEnquiryNotificationToAdmin({
        enquiryType: "Customize Package Enquiry",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Customize Package enquiry created successfully",
      newCustomizePackageEnquiry,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
