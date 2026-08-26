import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
    },
    state: {
      type: String,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    domesticPrice: {
      type: String,
      required: true,
    },
    internationalPrice: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
