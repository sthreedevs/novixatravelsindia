import mongoose from "mongoose";
const cruiseInfoSchema = new mongoose.Schema(
  {
    //personal info fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    // service fields
    countryOfResidence: { type: String, required: true },
    stateOfResidence: { type: String, required: true },
    preferredCruiseDestination: { type: String, required: true },
    preferredDepartureCity: { type: String, required: true },
    travelDates: { type: Date, required: true },
    numberOfNights: { type: Number, required: true },
    numberOfAdults: { type: Number},
    numberOfChildren: { type: Number },
    anySeniorCitizen: { type: String, },
    cabinPreference : { type: String, required: true },
    mealPreference : { type: String },
    specialRequests: { type: String },
  },
  {
    timestamps: true,
  }
);
export const CruiseInfo = mongoose.models.CruiseInfo || mongoose.model("CruiseInfo", cruiseInfoSchema);
