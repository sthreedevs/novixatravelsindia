import mongoose from "mongoose";

const europeRailTicketSchema = new mongoose.Schema(
  {
    //personal info fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },

    // service fields
    countryOfResidence: { type: String, required: true },
    panNumber: { type: String, },
    from: { type: String, required: true },
    to: { type: String, required: true },
    tripType: { type: String },
    travelClass: { type: String },
    departureDate: { type: Date, required: true },
    time: { type: String },
    numberOfAdults: { type: Number },
    numberOfYouth: { type: Number },
    numberOfSeniors: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const EuropeRailTicket = mongoose.models.EuropeRailTicket || mongoose.model("EuropeRailTicket",europeRailTicketSchema);
