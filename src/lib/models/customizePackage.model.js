import mongoose from "mongoose";

const customizePackageSchema = mongoose.Schema(
  {
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    name: { type: String, required: true }, // customer name
    email: { type: String, required: true }, // customer email
    phone: { type: String, required: true }, // customer phone
    days: { type: Number, required: true },
    nights: { type: Number, required: true },
    specialRequest: { type: String, required: true },
  },
  { timestamps: true }
);
export const CustomizePackage = mongoose.models.CustomizePackage || mongoose.model(
  "CustomizePackage",
  customizePackageSchema
);
