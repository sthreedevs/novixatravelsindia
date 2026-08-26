import mongoose from "mongoose";

const insuranceInfoSchema = new mongoose.Schema(
  {
    //personal info fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },

    //service fields
    country: { type: String, required: true }, 
    numberOfDays: { type: String },
    numberOfPassengers: { type: String },
    typeOfInsurance: { type: String },
    travellingFromIndia: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },

    documents: [String],
  },
  { timestamps: true }
);

export const InsuranceInfo = mongoose.models.InsuranceInfo || mongoose.model("InsuranceInfo", insuranceInfoSchema);
