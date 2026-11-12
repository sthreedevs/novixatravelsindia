import mongoose from "mongoose";

const eSimInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "Valued" },
    lastName: { type: String, default: "Traveler" },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    mobileNumber: { type: String },

    countryOfTravel: { type: String },
    destinationCountry: { type: String },
    destination: { type: String },
    dataPack: { type: String },
    selectedDataPlan: { type: String },
    message: { type: String },

    document: { type: String },
  },
  { timestamps: true, strict: false }
);

export const ESimInfo =
  mongoose.models.ESimInfo || mongoose.model("ESimInfo", eSimInfoSchema);
