import mongoose from "mongoose";

const europeRailPassSchema = new mongoose.Schema(
  {
    // Personal info fields
    firstName: { type: String, default: "Valued" },
    lastName: { type: String, default: "Traveler" },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    mobileNumber: { type: String },
    dob: { type: Date },

    // Service fields
    countryOfResidence: { type: String },
    panNumber: { type: String },
    country: { type: String },
    passType: { type: String },
    validFrom: { type: Date },
    travelDate: { type: Date },
    numberOfAdults: { type: String },
    numberOfYouth: { type: String },
    numberOfSeniors: { type: String },
    numberOfTravelsDays: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  }
);

  export const EuropeRailPass = mongoose.models.EuropeRailPass || mongoose.model("EuropeRailPass", europeRailPassSchema);
  