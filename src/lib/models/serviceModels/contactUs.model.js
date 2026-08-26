import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    enterYourMessage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const ContactUs = mongoose.models.ContactUs || mongoose.model("ContactUs", contactUsSchema);
