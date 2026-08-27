"use server";

import { connectDB } from "@/lib/db/index.js";
import { ContactUs } from "@/lib/models/serviceModels/contactUs.model.js";
import { contactUsSchema } from "@/lib/validations/index.js";
import { sendCreatedEnquiry, sendEnquiryNotificationToAdmin } from "@/lib/utils/emailService.js";

export async function submitContactForm(data) {
  try {
    // 1. Validate data with Zod
    const validatedData = contactUsSchema.parse(data);

    // 2. Connect to Database (Models are initialized automatically here now)
    await connectDB();

    // 3. Create entry
    const newContact = await ContactUs.create(validatedData);

    // 4. Send email notification
    if (newContact) {
      await sendCreatedEnquiry(data.email, newContact._id).catch(console.error);
      await sendEnquiryNotificationToAdmin({
        enquiryType: "Contact Us Message",
        enquiryId: newContact._id,
      }).catch(console.error);
    }

    // Return a plain object to the client because Mongoose documents can't be passed from Server Actions directly
    return {
      success: true,
      message: "Contact form submitted successfully!",
    };
  } catch (error) {
    console.error("SubmitContactForm Error:", error);

    // Handle Zod Validation Errors
    if (error.name === "ZodError") {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    // Handle general errors
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
