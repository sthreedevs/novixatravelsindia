import mongoose from "mongoose";

const dayTripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    descriptionList: { type: [String], required: true },
    inclusionList: { type: [String], required: true },
    exclusionList: { type: [String], required: true },
    info: { type: [String] },
    thumbnail: { type: String },
    domesticPrice: { type: String, required: true },
    internationalPrice: { type: String, required: true },
  },
  { timestamps: true }
);
export const DayTrip = mongoose.models.DayTrip || mongoose.model("DayTrip", dayTripSchema);
