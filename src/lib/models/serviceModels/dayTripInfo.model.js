import mongoose from "mongoose";
import { DayTrip } from "../dayTrip.model.js";

const dayTripInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    emergencyContact: { type: String },

    //service fields
    dayTrip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: DayTrip,
      required: true,
    },
    travelDate: { type: Date, required: true },
    numberOfAdults: { type: Number },
    numberOfChildren: { type: Number },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    paymentId: { type: String },
    flightArrivalTime: { type: String },
    flightDepartureTime: { type: String },
    languagePreference: { type: String },
    needGuide: { type: Boolean },
    documents: { type: [String] },
  },
  {
    timestamps: true,
  }
);

export const DayTripInfo = mongoose.models.DayTripInfo || mongoose.model("DayTripInfo", dayTripInfoSchema);
