import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    language: { type: String, required: true, unique: true, trim: true },
    domesticPrice: { type: String, required: true },
    internationalPrice: { type: String, required: true },
  },
  { timestamps: true }
);

export const Guide = mongoose.models.Guide || mongoose.model("Guide", guideSchema);
