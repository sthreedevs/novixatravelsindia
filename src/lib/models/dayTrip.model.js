import mongoose from "mongoose";

const dayTripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    destination: { type: String, default: "Agra" },
    tagline: { type: String },
    description: { type: String, required: true },
    domesticPrice: { type: String, required: true },
    internationalPrice: { type: String, default: "35" },

    // Key Specs Bar
    duration: { type: String, default: "Full Day (approx. 10–12 hours)" },
    tourType: { type: String, default: "Private / Small Group" },
    pickup: { type: String, default: "Delhi or Agra" },
    language: { type: String, default: "English / Russian on request" },
    rating: { type: String, default: "4.9/5" },
    ratingCount: { type: String, default: "Guest Experience" },

    // Experience Section
    experienceTitle: { type: String },
    experienceLead: { type: String },

    // Itinerary
    itinerarySubtitle: {
      type: String,
      default: "(Timings are indicative and can be customized)",
    },
    itinerary: [
      {
        time: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],

    // Highlights & Checklist
    descriptionList: { type: [String], default: [] },
    highlights: { type: [String], default: [] },

    // Info Cards
    inclusionList: { type: [String], default: [] },
    exclusionList: { type: [String], default: [] },
    info: { type: [String], default: [] }, // Know Before You Go

    // Media
    thumbnail: { type: String },
    heroImage: { type: String },
    gallery: [
      {
        image: { type: String },
        title: { type: String },
      },
    ],
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.DayTrip) {
  delete mongoose.models.DayTrip;
}

export const DayTrip = mongoose.model("DayTrip", dayTripSchema);
