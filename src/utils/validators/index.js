/**
 * Form & Data Validation Functions
 * Reusable validators for all form inputs
 */

import { VALIDATION_RULES, ERROR_MESSAGES } from "../constants";

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) return ERROR_MESSAGES.INVALID_EMAIL;
  return null;
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!VALIDATION_RULES.PHONE_REGEX.test(phone)) return ERROR_MESSAGES.INVALID_PHONE;
  return null;
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  if (!password) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH)
    return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  return null;
};

/**
 * Validate password confirmation
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (password !== confirmPassword) return ERROR_MESSAGES.PASSWORD_MISMATCH;
  return null;
};

/**
 * Validate URL format
 */
export const validateURL = (url) => {
  if (!url) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!VALIDATION_RULES.URL_REGEX.test(url)) return ERROR_MESSAGES.INVALID_URL;
  return null;
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = "This field") => {
  if (!value || (typeof value === "string" && value.trim() === ""))
    return `${fieldName} is required`;
  return null;
};

/**
 * Validate minimum length
 */
export const validateMinLength = (value, minLength) => {
  if (!value) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (value.length < minLength) return `Must be at least ${minLength} characters`;
  return null;
};

/**
 * Validate maximum length
 */
export const validateMaxLength = (value, maxLength) => {
  if (!value) return null;
  if (value.length > maxLength) return `Must not exceed ${maxLength} characters`;
  return null;
};

/**
 * Validate number range
 */
export const validateNumberRange = (value, min, max) => {
  const num = Number(value);
  if (isNaN(num)) return "Must be a valid number";
  if (num < min) return `Must be at least ${min}`;
  if (num > max) return `Must not exceed ${max}`;
  return null;
};

/**
 * Validate file size
 */
export const validateFileSize = (file, maxSize) => {
  if (!file) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return `File size must not exceed ${maxSizeMB}MB`;
  }
  return null;
};

/**
 * Validate file type
 */
export const validateFileType = (file, allowedTypes) => {
  if (!file) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!allowedTypes.includes(file.type)) {
    return `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`;
  }
  return null;
};

/**
 * Validate postal code
 */
export const validatePostalCode = (postalCode) => {
  if (!postalCode) return ERROR_MESSAGES.REQUIRED_FIELD;
  if (!VALIDATION_RULES.POSTAL_CODE_REGEX.test(postalCode))
    return "Please enter a valid postal code";
  return null;
};

/**
 * Validate date format (DD-MM-YYYY)
 */
export const validateDate = (dateString) => {
  if (!dateString) return ERROR_MESSAGES.REQUIRED_FIELD;
  
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if (!regex.test(dateString)) return "Date must be in DD-MM-YYYY format";
  
  const [day, month, year] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return "Please enter a valid date";
  }
  
  return null;
};

/**
 * Validate date is not in past
 */
export const validateFutureDate = (dateString) => {
  const error = validateDate(dateString);
  if (error) return error;
  
  const [day, month, year] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (date < today) return "Date must be in the future";
  return null;
};

/**
 * Validate array of emails
 */
export const validateEmailArray = (emails) => {
  if (!emails || emails.length === 0) return ERROR_MESSAGES.REQUIRED_FIELD;
  
  for (const email of emails) {
    const error = validateEmail(email);
    if (error) return error;
  }
  
  return null;
};

/**
 * Validate strong password (must contain uppercase, lowercase, number, special char)
 */
export const validateStrongPassword = (password) => {
  const baseError = validatePassword(password);
  if (baseError) return baseError;
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return "Password must contain uppercase, lowercase, number, and special character";
  }
  
  return null;
};

/**
 * Validate credit card number (Luhn algorithm)
 */
export const validateCreditCard = (cardNumber) => {
  if (!cardNumber) return ERROR_MESSAGES.REQUIRED_FIELD;
  
  const sanitized = cardNumber.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(sanitized)) return "Please enter a valid card number";
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) return "Invalid card number";
  return null;
};

/**
 * Batch validate multiple fields
 */
export const validateFields = (fields) => {
  const errors = {};
  
  for (const [fieldName, validationFn] of Object.entries(fields)) {
    const error = validationFn();
    if (error) errors[fieldName] = error;
  }
  
  return Object.keys(errors).length === 0 ? null : errors;
};

const validators = {
  validateEmail,
  validatePhone,
  validatePassword,
  validatePasswordMatch,
  validateURL,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateNumberRange,
  validateFileSize,
  validateFileType,
  validatePostalCode,
  validateDate,
  validateFutureDate,
  validateEmailArray,
  validateStrongPassword,
  validateCreditCard,
  validateFields,
};

export default validators;
