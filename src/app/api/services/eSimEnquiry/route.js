import { NextResponse } from "next/server";
import { ESimInfo } from "@/lib/models/serviceModels/eSimInfo.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { sendCreatedEnquiry, sendEnquiryNotificationToAdmin } from "@/lib/utils/emailService.js";
import { encryptText } from "@/lib/utils/encryptionHelper.js";

export async function POST(request) {
  try {
    await connectDB();
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Form data required" }, { status: 400 });
    }

    const formData = await request.formData();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const countryOfTravel = formData.get("countryOfTravel");
    const selectedDataPlan = formData.get("selectedDataPlan");
    const file = formData.get("document");

    if (!firstName || !lastName || !email || !phone || !countryOfTravel || !selectedDataPlan) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "Document file is required." }, { status: 400 });
    }

    const encryptedFields = {
      firstName: encryptText(firstName),
      lastName: encryptText(lastName),
      email: encryptText(email),
      phone: encryptText(phone),
      countryOfTravel: encryptText(countryOfTravel),
    };

    let encryptedDocument = {};
    const result = await uploadOnCloudinary(file);

    if (result && result.secure_url) {
      const encryptedUrl = encryptText(result.secure_url);
      encryptedDocument = {
        url: encryptedUrl.data,
        iv: encryptedUrl.iv,
      };
    }

    const newEnquiry = await ESimInfo.create({
      firstName: encryptedFields.firstName.data,
      firstNameIV: encryptedFields.firstName.iv,
      lastName: encryptedFields.lastName.data,
      lastNameIV: encryptedFields.lastName.iv,
      email: encryptedFields.email.data,
      emailIV: encryptedFields.email.iv,
      phone: encryptedFields.phone.data,
      phoneIV: encryptedFields.phone.iv,
      countryOfTravel: encryptedFields.countryOfTravel.data,
      countryOfTravelIV: encryptedFields.countryOfTravel.iv,
      selectedDataPlan,
      document: encryptedDocument.url,
      documentIV: encryptedDocument.iv,
    });

    if (newEnquiry) {
      await sendCreatedEnquiry(email, newEnquiry._id);
      await sendEnquiryNotificationToAdmin({
        enquiryType: "eSIM Enquiry",
        enquiryId: newEnquiry._id,
      });
    }

    return NextResponse.json({
      success: true,
      message: "eSIM enquiry submitted successfully.",
      data: newEnquiry,
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
