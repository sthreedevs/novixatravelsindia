import mongoose from "mongoose";

const eSimInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    firstNameIV: { type: String, required: true },

    lastName: { type: String, required: true },
    lastNameIV: { type: String, required: true },

    email: { type: String, required: true },
    emailIV: { type: String, required: true },

    phone: { type: String, required: true },
    phoneIV: { type: String, required: true },

    countryOfTravel: { type: String, required: true },
    countryOfTravelIV: { type: String, required: true },

    selectedDataPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ESimPlan",
      required: true,
    },

    document: { type: String, required: true },
    documentIV: { type: String, required: true },
  },
  { timestamps: true }
);

export const ESimInfo = mongoose.models.ESimInfo || mongoose.model("ESimInfo", eSimInfoSchema);
