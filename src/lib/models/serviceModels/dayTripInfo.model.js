import mongoose from "mongoose";
import { DayTrip } from "../dayTrip.model.js";

const dayTripInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "Traveler" },
    email: { type: String, default: "guest@novixatravels.in" },
    phone: { type: String, required: true },
    mobileNumber: { type: String },
    emergencyContact: { type: String },
    notes: { type: String },

    // Service fields
    tripId: { type: String },
    tripTitle: { type: String, default: "Day Trip" },
    dayTrip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: DayTrip,
      required: false,
    },
    travelDate: { type: Date, default: Date.now },
    numberOfAdults: { type: Number, default: 2 },
    numberOfChildren: { type: Number, default: 0 },
    pickupLocation: { type: String, default: "Delhi" },
    tourType: { type: String, default: "Private Tour" },
    dropLocation: { type: String, default: "Same as pickup" },
    paymentMethod: { type: String, default: "Custom Quote Requested" },
    paymentStatus: { type: String, default: "Pending Quote" },
    paymentId: { type: String },
    flightArrivalTime: { type: String },
    flightDepartureTime: { type: String },
    languagePreference: { type: String },
    needGuide: { type: Boolean, default: true },
    documents: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export const DayTripInfo =
  mongoose.models.DayTripInfo ||
  mongoose.model("DayTripInfo", dayTripInfoSchema);
