import mongoose from "mongoose";

const packageInfoSchema = new mongoose.Schema(
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
    whoIsTraveling: { type: String },
    numberOfAdult: { type: String },
    numberOfChild: { type: String },
    hotelCategory: { type: String },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
    numberOfRooms: { type: String },
    mealPlan: { type: String },
    numberOfNights: { type: String },
    wantToIncludeFlight: { type: String },
    budgetPerPerson: { type: String },

    documents: [String], 
  },
  { timestamps: true }
);

export const PackageInfo = mongoose.models.PackageInfo || mongoose.model("PackageInfo", packageInfoSchema);
