import { NextResponse } from "next/server";
import { CruiseInfo } from "@/lib/models/serviceModels/cruiseInfo.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { sendCreatedEnquiry, sendEnquiryNotificationToAdmin } from "@/lib/utils/emailService.js";

export async function POST(request) {
  try {
    await connectDB();
    const contentType = request.headers.get("content-type") || "";
    let data = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (key !== "documents" && key !== "document" && typeof value === "string") {
          data[key] = value;
        }
      }
      
    } else {
      data = await request.json();
    }

    const newEnquiry = await CruiseInfo.create(data);

    if (newEnquiry && data.email) {
      await sendCreatedEnquiry(data.email, newEnquiry._id);
      await sendEnquiryNotificationToAdmin({
        enquiryType: "Cruise Enquiry",
        enquiryId: newEnquiry._id,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Cruise Enquiry submitted successfully.",
      data: newEnquiry,
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
