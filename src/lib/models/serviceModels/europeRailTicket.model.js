import mongoose from "mongoose";

const europeRailTicketSchema = new mongoose.Schema(
  {
    // Personal info fields
    firstName: { type: String, default: "Valued" },
    lastName: { type: String, default: "Traveler" },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    mobileNumber: { type: String },
    dob: { type: Date },

    // Service fields
    countryOfResidence: { type: String },
    panNumber: { type: String },
    from: { type: String },
    to: { type: String },
    fromCity: { type: String },
    toCity: { type: String },
    departureCity: { type: String },
    arrivalCity: { type: String },
    tripType: { type: String },
    travelClass: { type: String },
    departureDate: { type: Date },
    travelDate: { type: Date },
    time: { type: String },
    numberOfAdults: { type: String },
    numberOfYouth: { type: String },
    numberOfSeniors: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const EuropeRailTicket = mongoose.models.EuropeRailTicket || mongoose.model("EuropeRailTicket",europeRailTicketSchema);
