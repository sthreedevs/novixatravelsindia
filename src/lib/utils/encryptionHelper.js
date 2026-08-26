import crypto from "crypto";
import "dotenv/config";

const algorithm = "aes-256-cbc";
const secretKey = Buffer.from(process.env.ENCRYPTION_SECRET, "hex");

const encryptText = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return {
    data: encrypted.toString("hex"),
    iv: iv.toString("hex"),
  };
};

const decryptText = (encryptedText, ivHex) => {
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
};

const decryptVisaFields = (data) => {
  const decrypted = { ...data };

  const fieldsToDecrypt = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "dob",
    "gender",
    "travelCountry",
    "nationality",
    "placeOfBirth",
    "address",
    "city",
    "pincode",
    "visaType",
    "numberOfApplicant",
    "holdingDualNationality",
    "maritalStatus",
    "employment",
    "hasThreeYearsITR",
  ];

  fieldsToDecrypt.forEach((field) => {
    const ivField = `${field}IV`;
    if (data[field] && data[ivField]) {
      decrypted[field] = decryptText(data[field], data[ivField]);
    }
  });

  return decrypted;
};

const decryptPassportFields = (data) => {
  const decrypted = { ...data };

  const fieldsToDecrypt = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "dob",
    "gender",
    "middleName",
    "nationality",
    "state",
    "city",
    "pincode",
    "applicationType",
  ];

  fieldsToDecrypt.forEach((field) => {
    const ivField = `${field}IV`;
    if (data[field] && data[ivField]) {
      decrypted[field] = decryptText(data[field], data[ivField]);
    }
  });

  return decrypted;
};

const decryptESimFields = (data) => {
  const decrypted = { ...data };

  const fieldsToDecrypt = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "countryOfTravel",
    "document",
  ];

  fieldsToDecrypt.forEach((field) => {
    const ivField = `${field}IV`;
    if (data[field] && data[ivField]) {
      decrypted[field] = decryptText(data[field], data[ivField]);
    }
  });

  return decrypted;
};

export {
  encryptText,
  decryptText,
  decryptVisaFields,
  decryptPassportFields,
  decryptESimFields,
};
