import mongoose from "mongoose";

const hotelInfoSchema = new mongoose.Schema(
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
    hotelName: { type: String },
    destination: { type: String },
    destinationCity: { type: String },
    city: { type: String },
    country: { type: String },
    nationality: { type: String },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    checkIn: { type: String },
    checkOut: { type: String },
    guests: { type: String },
    numberOfAdults: { type: Number },
    numberOfChild: { type: Number },
    numberOfRooms: { type: Number },
    hotelCategory: { type: String },
    hotelType: { type: String },
    budget: { type: String },
    mealPlan: { type: String },
    specialRequests: { type: String },
    message: { type: String },

    documents: [String],
  },
  { timestamps: true, strict: false }
);

export const HotelInfo = mongoose.models.HotelInfo || mongoose.model("HotelInfo", hotelInfoSchema);
