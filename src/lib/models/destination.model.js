import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    isTrendingIndian:{type: Boolean, default: false },
    isTrendingInternational:{type: Boolean, default: false} ,
    country: { type: String, required: true, lowercase: true },
    continent: { type: String, required: true, lowercase: true },
    thumbnail: { type: String },
    tags: { type: [String], required: true },
    descriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DestinationDescription",
      },
    ],
    carouselData: [{ type: mongoose.Schema.Types.ObjectId, ref: "Carousel" }],
  },
  {
    timestamps: true,
  }
);

export const Destination = mongoose.models.Destination || mongoose.model("Destination", destinationSchema);
