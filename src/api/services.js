/**
 * API Service Methods
 * Organized service calls for different features
 */

import { get, post, put, patch, delete_ } from "./client";
import { API_ENDPOINTS } from "../constants";

/**
 * Destination Services
 */
export const destinationService = {
  getAll: () => get(API_ENDPOINTS.DESTINATIONS),
  getByName: (name) => get(API_ENDPOINTS.DESTINATION_BY_NAME(name)),
  create: (data) => post(API_ENDPOINTS.DESTINATIONS, data),
  update: (id, data) => put(`${API_ENDPOINTS.DESTINATIONS}/${id}`, data),
  delete: (id) => delete_(`${API_ENDPOINTS.DESTINATIONS}/${id}`),
};

/**
 * Package Services
 */
export const packageService = {
  getAll: (query = {}) => get(API_ENDPOINTS.PACKAGES, { params: query }),
  getById: (id) => get(API_ENDPOINTS.PACKAGE_BY_ID(id)),
  create: (data) => post(API_ENDPOINTS.PACKAGES, data),
  update: (id, data) => put(`${API_ENDPOINTS.PACKAGES}/${id}`, data),
  delete: (id) => delete_(`${API_ENDPOINTS.PACKAGES}/${id}`),
  customize: (data) => post(API_ENDPOINTS.CUSTOMIZE_PACKAGE, data),
};

/**
 * Day Trip Services
 */
export const dayTripService = {
  getAll: (query = {}) => get(API_ENDPOINTS.DAY_TRIPS, { params: query }),
  getById: (id) => get(API_ENDPOINTS.DAY_TRIP_BY_ID(id)),
  create: (data) => post(API_ENDPOINTS.DAY_TRIPS, data),
  update: (id, data) => put(`${API_ENDPOINTS.DAY_TRIPS}/${id}`, data),
  delete: (id) => delete_(`${API_ENDPOINTS.DAY_TRIPS}/${id}`),
};

/**
 * Hotel Services
 */
export const hotelService = {
  getAll: (query = {}) => get(API_ENDPOINTS.HOTELS, { params: query }),
  getById: (id) => get(API_ENDPOINTS.HOTEL_BY_ID(id)),
  create: (data) => post(API_ENDPOINTS.HOTELS, data),
  update: (id, data) => put(`${API_ENDPOINTS.HOTELS}/${id}`, data),
  delete: (id) => delete_(`${API_ENDPOINTS.HOTELS}/${id}`),
};

/**
 * E-SIM Services
 */
export const esimService = {
  getAll: () => get(API_ENDPOINTS.ESIM),
  getPlans: () => get(API_ENDPOINTS.ESIM_PLANS),
  getById: (id) => get(API_ENDPOINTS.ESIM_PLAN_BY_ID(id)),
  create: (data) => post(API_ENDPOINTS.ESIM, data),
  update: (id, data) => put(`${API_ENDPOINTS.ESIM}/${id}`, data),
  delete: (id) => delete_(`${API_ENDPOINTS.ESIM}/${id}`),
};

/**
 * Blog Services
 */
export const blogService = {
  getAll: (query = {}) => get(API_ENDPOINTS.BLOGS, { params: query }),
  getById: (id) => get(API_ENDPOINTS.BLOG_BY_ID(id)),
  create: (data) => post(API_ENDPOINTS.BLOGS, data),
  update: (id, data) => put(`${API_ENDPOINTS.BLOGS}/${id}`, data),
  delete: (id) => delete_(`${API_ENDPOINTS.BLOGS}/${id}`),
};

/**
 * Service Services
 */
export const serviceService = {
  getAll: () => get(API_ENDPOINTS.SERVICES),
  getByName: (name) => get(API_ENDPOINTS.SERVICE_BY_NAME(name)),
  create: (data) => post(API_ENDPOINTS.SERVICES, data),
  update: (id, data) => put(`${API_ENDPOINTS.SERVICES}/${id}`, data),
  delete: (id) => delete_(`${API_ENDPOINTS.SERVICES}/${id}`),
};

/**
 * Testimonial Services
 */
export const testimonialService = {
  getAll: () => get(API_ENDPOINTS.TESTIMONIALS),
  create: (data) => post(API_ENDPOINTS.TESTIMONIALS, data),
  delete: (id) => delete_(`${API_ENDPOINTS.TESTIMONIALS}/${id}`),
};

/**
 * Carousel Services
 */
export const carouselService = {
  getAll: () => get(API_ENDPOINTS.CAROUSEL),
  create: (data) => post(API_ENDPOINTS.CAROUSEL, data),
  update: (id, data) => put(`${API_ENDPOINTS.CAROUSEL}/${id}`, data),
  delete: (id) => delete_(`${API_ENDPOINTS.CAROUSEL}/${id}`),
};

/**
 * Newsletter Services
 */
export const newsletterService = {
  subscribe: (email) => post(API_ENDPOINTS.NEWSLETTER_SUBSCRIBE, { email }),
};

/**
 * Contact Us Services
 */
export const contactService = {
  submit: (data) => post(API_ENDPOINTS.CONTACT_US, data),
};

/**
 * Search Services
 */
export const searchService = {
  search: (query) => get(API_ENDPOINTS.SEARCH(query)),
};

/**
 * User Services
 */
export const userService = {
  login: (credentials) => post(API_ENDPOINTS.USER_LOGIN, credentials),
  register: (data) => post(API_ENDPOINTS.USER_REGISTER, data),
  getProfile: () => get(API_ENDPOINTS.USER_PROFILE),
  updateProfile: (data) => put(API_ENDPOINTS.USER_PROFILE, data),
  changePassword: (data) => post(`${API_ENDPOINTS.USER}/change-password`, data),
  logout: () => post(`${API_ENDPOINTS.USER}/logout`),
};

/**
 * Payment Services
 */
export const paymentService = {
  initiatePayment: (data) => post(API_ENDPOINTS.PAYMENT, data),
  verifyPayment: (data) => post(API_ENDPOINTS.PAYMENT_VERIFY, data),
};

/**
 * Subscriber Services
 */
export const subscriberService = {
  verify: (token) => get(API_ENDPOINTS.VERIFY_SUBSCRIBER(token)),
};

/**
 * Navbar Services
 */
export const navbarService = {
  getTop: () => get(API_ENDPOINTS.NAVBAR_TOP),
};

export default {
  destinationService,
  packageService,
  dayTripService,
  hotelService,
  esimService,
  blogService,
  serviceService,
  testimonialService,
  carouselService,
  newsletterService,
  contactService,
  searchService,
  userService,
  paymentService,
  subscriberService,
  navbarService,
};
