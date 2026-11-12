import mongoose from "mongoose";
const cruiseInfoSchema = new mongoose.Schema(
  {
    // Personal info fields
    firstName: { type: String, default: "Valued" },
    lastName: { type: String, default: "Traveler" },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    mobileNumber: { type: String },

    // Service fields
    countryOfResidence: { type: String },
    stateOfResidence: { type: String },
    preferredCruiseDestination: { type: String },
    cruiseDestination: { type: String },
    destination: { type: String },
    preferredDepartureCity: { type: String },
    departureCity: { type: String },
    travelDates: { type: Date },
    travelDate: { type: Date },
    departureDate: { type: Date },
    numberOfNights: { type: String },
    numberOfAdults: { type: String },
    numberOfChildren: { type: String },
    travelers: { type: String },
    anySeniorCitizen: { type: String },
    cabinPreference: { type: String },
    cabinType: { type: String },
    mealPreference: { type: String },
    specialRequests: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  }
);
export const CruiseInfo = mongoose.models.CruiseInfo || mongoose.model("CruiseInfo", cruiseInfoSchema);
