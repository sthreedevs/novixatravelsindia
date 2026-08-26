import mongoose from "mongoose";

const transportInfoSchema = new mongoose.Schema(
  {
    //personal info fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },

    //service fields
    numberOfAdults: { type: String, required: true },
    numberOfChild: { type: String, required: true },
    carBusType: { type: String, required: true },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true }, // may be change
    pickUp: { type: String, required: true },
    dropOff: { type: String, required: true },
    pickUpTime: { type: String, required: true },

    documents: [String],
  },
  { timestamps: true }
);

export const TransportInfo = mongoose.models.TransportInfo || mongoose.model(
  "TransportInfo",
  transportInfoSchema
);
