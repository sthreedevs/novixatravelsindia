import { NextResponse } from "next/server";
import { DayTripInfo } from "@/lib/models/serviceModels/dayTripInfo.model.js";
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
      
    let uploadedDocuments = [];
    const files = formData.getAll("documents");
    if (files && files.length > 0) {
      for (const file of files) {
        if (file && file.size > 0) {
          const result = await uploadOnCloudinary(file);
          if (result && result.secure_url) {
            uploadedDocuments.push(result.secure_url);
          }
        }
      }
    }
    data.documents = uploadedDocuments;
    
    } else {
      data = await request.json();
    }

    const newEnquiry = await DayTripInfo.create(data);

    if (newEnquiry && data.email) {
      await sendCreatedEnquiry(data.email, newEnquiry._id);
      await sendEnquiryNotificationToAdmin({
        enquiryType: "Day Trip Enquiry",
        enquiryId: newEnquiry._id,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Day Trip Enquiry submitted successfully.",
      data: newEnquiry,
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
