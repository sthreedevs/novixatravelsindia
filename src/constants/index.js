/**
 * Application Constants
 * Centralized configuration for the entire application
 */

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
export const API_TIMEOUT = 30000; // 30 seconds

// API Endpoints
export const API_ENDPOINTS = {
  // Destinations
  DESTINATIONS: "/destination",
  DESTINATION_BY_NAME: (name) => `/destination/${name}`,

  // Packages
  PACKAGES: "/package",
  PACKAGE_BY_ID: (id) => `/package/${id}`,
  CUSTOMIZE_PACKAGE: "/customize-package",

  // Day Trips
  DAY_TRIPS: "/daytrip",
  DAY_TRIP_BY_ID: (id) => `/daytrip/${id}`,

  // Services
  SERVICES: "/service",
  SERVICE_BY_NAME: (name) => `/service/${name}`,

  // Hotel
  HOTELS: "/hotel",
  HOTEL_BY_ID: (id) => `/hotel/${id}`,

  // E-SIM
  ESIM: "/esim",
  ESIM_PLANS: "/esim/plans",
  ESIM_PLAN_BY_ID: (id) => `/esim/${id}`,

  // Blog
  BLOGS: "/blog",
  BLOG_BY_ID: (id) => `/blog/${id}`,

  // Carousel
  CAROUSEL: "/carousel",

  // Testimonial
  TESTIMONIALS: "/testimonial",

  // Newsletter
  NEWSLETTER_SUBSCRIBE: "/newsletter",

  // Contact Us
  CONTACT_US: "/contactUs",

  // Search
  SEARCH: (query) => `/search?q=${query}`,

  // User
  USER: "/user",
  USER_LOGIN: "/user/login",
  USER_REGISTER: "/user/register",
  USER_PROFILE: "/user/profile",

  // Payment
  PAYMENT: "/payment",
  PAYMENT_VERIFY: "/payment/verify",

  // Navbar
  NAVBAR_TOP: "/navbarTop",

  // Subscriber
  SUBSCRIBER: "/subscriber",
  VERIFY_SUBSCRIBER: (token) => `/subscriber/verify/${token}`,
};

// Service Types
export const SERVICE_TYPES = {
  VISA: "visa",
  FLIGHTS: "flights",
  HOTELS: "hotels",
  TRAINS: "trains",
  PACKAGES: "packages",
  DAY_TRIPS: "day-trips",
  ESIM: "e-sim",
  CAR_RENTAL: "car-bus-rental",
  PASSPORT: "passport",
  INSURANCE: "insurance",
  RAIL_EUROPE: "rail-europe",
  CRUISE: "cruise",
};

// Status Codes
export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  PENDING: "pending",
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "MMM DD, YYYY",
  ISO: "YYYY-MM-DD",
  TIME: "HH:mm:ss",
  DATETIME: "YYYY-MM-DD HH:mm:ss",
};

// Cache Duration (in ms)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
};

// Local Storage Keys
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  USER_DATA: "userData",
  USER_PREFERENCES: "userPreferences",
  THEME: "theme",
  LANGUAGE: "language",
  CART: "cart",
  SEARCH_HISTORY: "searchHistory",
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 50,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  URL_REGEX: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  POSTAL_CODE_REGEX: /^\d{5,6}$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_MISMATCH: "Passwords do not match",
  INVALID_URL: "Please enter a valid URL",
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNAUTHORIZED: "You are not authorized to perform this action",
  NOT_FOUND: "The requested resource was not found",
  DUPLICATE_EMAIL: "This email is already registered",
  INVALID_TOKEN: "Invalid or expired token",
  SESSION_EXPIRED: "Your session has expired. Please log in again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully",
  LOGOUT_SUCCESS: "Logged out successfully",
  REGISTRATION_SUCCESS: "Account created successfully",
  UPDATE_SUCCESS: "Updated successfully",
  DELETE_SUCCESS: "Deleted successfully",
  SAVE_SUCCESS: "Saved successfully",
  SUBMIT_SUCCESS: "Submitted successfully",
  EMAIL_VERIFIED: "Email verified successfully",
};

// Routes
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about-us",
  CONTACT: "/contact-us",
  SERVICES: "/services",
  PACKAGES: "/services/packages",
  PACKAGE_DETAIL: (id) => `/services/packages/${id}`,
  DAY_TRIPS: "/services/day-trips",
  VISA: "/services/visa",
  FLIGHTS: "/services/flights",
  HOTELS: "/services/hotels",
  TRAINS: "/services/trains",
  ESIM: "/services/e-sim",
  CAR_RENTAL: "/services/car-bus-rental",
  PASSPORT: "/services/passport",
  INSURANCE: "/services/insurance",
  RAIL_EUROPE: "/services/rail-europe",
  CRUISE: "/services/cruise",
  BLOGS: "/blogs",
  BLOG_DETAIL: (id) => `/blogs/${id}`,
  DESTINATION: (name) => `/destination/${name}`,
  TERMS: "/terms-conditions",
  PRIVACY: "/privacy-policy",
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_MANAGE: (name) => `/admin/manage/${name}`,
  ADMIN_ENQUIRIES: "/admin/enquiries",
  ADMIN_NOTIFICATIONS: "/admin/notifications",
  ADMIN_ESIM: "/admin/e-sim",
  ADMIN_GUIDES: "/admin/guides",
  LOGIN: "/auth",
  REGISTER: "/auth",
};

// Theme Colors
export const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Notification Duration (in ms)
export const NOTIFICATION_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

// Environment
export const ENVIRONMENT = {
  DEVELOPMENT: "development",
  STAGING: "staging",
  PRODUCTION: "production",
};

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  SERVICE_TYPES,
  STATUS,
  HTTP_STATUS,
  PAGINATION,
  ROUTES,
  THEME,
  LOCAL_STORAGE_KEYS,
  VALIDATION_RULES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
