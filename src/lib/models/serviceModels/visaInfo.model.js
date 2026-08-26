import mongoose from "mongoose";

const visaInfoSchema = new mongoose.Schema(
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

    travelCountry: { type: String, required: true },
    travelCountryIV: { type: String },

    nationality: { type: String, required: true },
    nationalityIV: { type: String },

    placeOfBirth: { type: String },
    placeOfBirthIV: { type: String },

    address: { type: String },
    addressIV: { type: String },

    city: { type: String },
    cityIV: { type: String },

    pincode: { type: String },
    pincodeIV: { type: String },

    visaType: { type: String, required: true },
    visaTypeIV: { type: String },

    numberOfApplicant: { type: String, required: true },
    numberOfApplicantIV: { type: String },

    holdingDualNationality: { type: String },
    holdingDualNationalityIV: { type: String },

    maritalStatus: { type: String },
    maritalStatusIV: { type: String },

    employment: { type: String },
    employmentIV: { type: String },

    hasThreeYearsITR: { type: String },
    hasThreeYearsITRIV: { type: String },

    documents: [
      {
        url: String,
        iv: String,
      },
    ],
  },
  { timestamps: true }
);

export const VisaInfo = mongoose.models.VisaInfo || mongoose.model("VisaInfo", visaInfoSchema);