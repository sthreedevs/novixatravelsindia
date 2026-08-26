import mongoose from "mongoose";

const hotelInfoSchema = new mongoose.Schema(
  {
    //personal info fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },

    //service fields
    hotelName: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    nationality: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfAdults: { type: Number },
    numberOfChild: { type: Number },
    numberOfRooms: { type: Number },
    hotelCategory: { type: String },
    mealPlan: { type: String },

    documents: [String],
  },
  { timestamps: true }
);

export const HotelInfo = mongoose.models.HotelInfo || mongoose.model("HotelInfo", hotelInfoSchema);
