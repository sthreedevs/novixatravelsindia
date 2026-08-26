import mongoose from "mongoose";

const trainInfoSchema = new mongoose.Schema(
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
    departureDate: { type: Date, required: true },
    departureTime: { type: String },
    numberOfAdults: { type: String, required: true },
    numberOfChild: { type: String, required: true },
    travelClass: { type: String, required: true },
    specialQuota: { type: String },

    documents: [String],
  },
  { timestamps: true }
);

export const TrainInfo = mongoose.models.TrainInfo || mongoose.model("TrainInfo", trainInfoSchema);
