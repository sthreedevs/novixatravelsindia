import mongoose from "mongoose";

const trainInfoSchema = new mongoose.Schema(
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
    fromCity: { type: String },
    toCity: { type: String },
    departureCity: { type: String },
    arrivalCity: { type: String },
    departureDate: { type: Date },
    travelDate: { type: Date },
    departureTime: { type: String },
    numberOfAdults: { type: String },
    numberOfChild: { type: String },
    numberOfPassengers: { type: String },
    travelClass: { type: String },
    specialQuota: { type: String },
    message: { type: String },

    documents: [String],
  },
  { timestamps: true, strict: false }
);

export const TrainInfo = mongoose.models.TrainInfo || mongoose.model("TrainInfo", trainInfoSchema);
