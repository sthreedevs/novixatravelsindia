import mongoose from "mongoose";

const flightInfoSchema = new mongoose.Schema(
  {
    //personal info fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },

    //service fields
    from: { type: String, required: true },
    to: { type: String, required: true },
    nationality: { type: String, required: true },
    airline: { type: String },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true }, 
    preferredTime: { type: String },
    numberOfAdults: { type: String },
    numberOfChild: { type: String },
    travelClass: { type: String },
    tripType: { type: String },
    stop: { type: String },

    documents:{type:[String]} ,
  },
  { timestamps: true }
);

export const FlightInfo = mongoose.models.FlightInfo || mongoose.model("FlightInfo", flightInfoSchema);
