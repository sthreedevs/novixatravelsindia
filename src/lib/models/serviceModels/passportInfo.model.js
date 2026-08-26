import mongoose from "mongoose";

const passportInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    firstNameIV: { type: String },

    lastName: { type: String, required: true },
    lastNameIV: { type: String },

    email: { type: String, required: true },
    emailIV: { type: String },

    phone: { type: String, required: true },
    phoneIV: { type: String },

    dob: { type: String },
    dobIV: { type: String },

    gender: { type: String },
    genderIV: { type: String },

    middleName: { type: String },
    middleNameIV: { type: String },

    nationality: { type: String, required: true },
    nationalityIV: { type: String },

    state: { type: String, required: true },
    stateIV: { type: String },

    city: { type: String, required: true },
    cityIV: { type: String },

    pincode: { type: String, required: true },
    pincodeIV: { type: String },

    applicationType: { type: String, required: true },
    applicationTypeIV: { type: String },

    documents: [
      {
        url: String,
        iv: String,
      },
    ],
  },
  { timestamps: true }
);

export const PassportInfo = mongoose.models.PassportInfo || mongoose.model("PassportInfo", passportInfoSchema);
