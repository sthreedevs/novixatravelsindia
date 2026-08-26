import mongoose from "mongoose";

const destinationDescriptionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    highlights: [
      {
        title: { type: String, required: true },
        description: { type: String },
      },
    ],
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export const DestinationDescription = mongoose.models.DestinationDescription || mongoose.model(
  "DestinationDescription",
  destinationDescriptionSchema
);
