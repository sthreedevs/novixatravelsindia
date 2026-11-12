import mongoose from "mongoose";

const visaInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "Valued" },
    lastName: { type: String, default: "Applicant" },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    mobileNumber: { type: String },

    dob: { type: String },
    gender: { type: String },
    travelCountry: { type: String },
    destinationCountry: { type: String },
    country: { type: String },
    nationality: { type: String },
    placeOfBirth: { type: String },
    address: { type: String },
    city: { type: String },
    pincode: { type: String },
    visaType: { type: String },
    travelDate: { type: Date },
    numberOfApplicant: { type: String },
    message: { type: String },

    documents: [
      {
        url: String,
        iv: String,
      },
    ],
  },
  { timestamps: true, strict: false }
);

export const VisaInfo = mongoose.models.VisaInfo || mongoose.model("VisaInfo", visaInfoSchema);