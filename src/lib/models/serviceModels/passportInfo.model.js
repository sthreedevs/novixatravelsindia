import mongoose from "mongoose";

const passportInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "Valued" },
    lastName: { type: String, default: "Applicant" },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    mobileNumber: { type: String },

    dob: { type: String },
    gender: { type: String },
    middleName: { type: String },
    nationality: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: String },

    serviceType: { type: String },
    applicationType: { type: String },
    query: { type: String },
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

export const PassportInfo = mongoose.models.PassportInfo || mongoose.model("PassportInfo", passportInfoSchema);
