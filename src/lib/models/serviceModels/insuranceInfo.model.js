import mongoose from "mongoose";

const insuranceInfoSchema = new mongoose.Schema(
  {
    // Personal info fields
    firstName: { type: String, default: "Valued" },
    lastName: { type: String, default: "Traveler" },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    mobileNumber: { type: String },
    dob: { type: Date },
    gender: { type: String },

    // Service fields
    country: { type: String },
    destinationCountry: { type: String },
    destination: { type: String },
    numberOfDays: { type: String },
    numberOfPassengers: { type: String },
    travellers: { type: String },
    typeOfInsurance: { type: String },
    plan: { type: String },
    travellingFromIndia: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    travelDates: { type: String },
    message: { type: String },

    documents: [String],
  },
  { timestamps: true, strict: false }
);

export const InsuranceInfo = mongoose.models.InsuranceInfo || mongoose.model("InsuranceInfo", insuranceInfoSchema);
