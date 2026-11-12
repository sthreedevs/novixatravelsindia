import mongoose from "mongoose";

const transportInfoSchema = new mongoose.Schema(
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
    pickUp: { type: String },
    dropOff: { type: String },
    fromLocation: { type: String },
    toLocation: { type: String },
    from: { type: String },
    to: { type: String },
    departureCity: { type: String },
    arrivalCity: { type: String },
    departureDate: { type: Date },
    arrivalDate: { type: Date },
    travelDate: { type: Date },
    dateTime: { type: String },
    pickUpTime: { type: String },
    carBusType: { type: String },
    serviceType: { type: String },
    vehicleType: { type: String },
    passengers: { type: String },
    numberOfAdults: { type: String },
    numberOfChild: { type: String },
    specialRequests: { type: String },
    message: { type: String },

    documents: [String],
  },
  { timestamps: true, strict: false }
);

export const TransportInfo = mongoose.models.TransportInfo || mongoose.model(
  "TransportInfo",
  transportInfoSchema
);
