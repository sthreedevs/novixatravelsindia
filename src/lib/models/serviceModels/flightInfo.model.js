import mongoose from "mongoose";

const flightInfoSchema = new mongoose.Schema(
  {
    // Personal info fields
    firstName: { type: String, default: "Valued" },
    lastName: { type: String, default: "Traveler" },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    mobileNumber: { type: String },
    dob: { type: Date },
    gender: { type: String },

    // Service fields
    from: { type: String },
    to: { type: String },
    departureCity: { type: String },
    arrivalCity: { type: String },
    nationality: { type: String },
    airline: { type: String },
    departureDate: { type: Date },
    arrivalDate: { type: Date },
    travelDate: { type: Date },
    returnDate: { type: Date },
    preferredTime: { type: String },
    numberOfAdults: { type: String },
    numberOfChild: { type: String },
    numberOfPassengers: { type: String },
    passengersClass: { type: String },
    travelClass: { type: String },
    tripType: { type: String },
    stop: { type: String },
    specialRequests: { type: String },
    message: { type: String },

    documents: { type: [String] },
  },
  { timestamps: true, strict: false }
);

export const FlightInfo = mongoose.models.FlightInfo || mongoose.model("FlightInfo", flightInfoSchema);
