import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    planName: { type: String, required: true },
    dataMB: { type: String, required: true },
    validityDays: { type: String, required: true },
    dataSpeed: { type: String, required: true },
    operatorName: { type: String },
    fupLimit: { type: String},
    dataGB: { type: String },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

export const ESimPlan = mongoose.models.ESimPlan || mongoose.model("ESimPlan", planSchema);