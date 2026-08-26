import mongoose from "mongoose";

const europeRailPassSchema = new mongoose.Schema(
  {
    //personal info fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },

    // service fields
    countryOfResidence: { type: String, required: true },
    panNumber: { type: String },
    country: { type: String, required: true },
    validFrom: { type: Date, required: true },
    numberOfAdults: { type: Number },
    numberOfYouth: { type: Number },
    numberOfSeniors: { type: Number },
    numberOfTravelsDays: { type: Number },
  },{
    timestamps:true
  });

  export const EuropeRailPass = mongoose.models.EuropeRailPass || mongoose.model("EuropeRailPass", europeRailPassSchema);
  