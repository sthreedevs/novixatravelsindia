import mongoose from "mongoose";

const homeDestinationSchema = new mongoose.Schema(
  {
    domestic: [{ type: mongoose.Schema.Types.ObjectId, ref: "Destination" }],
    international: [{ type: mongoose.Schema.Types.ObjectId, ref: "Destination" }],
  },
  { timestamps: true }
);

export const HomeDestination = mongoose.models.HomeDestination || mongoose.model(
  "HomeDestination",
  homeDestinationSchema
);