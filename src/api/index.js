/**
 * API Module Exports
 * Centralized API client and service exports
 */

export { default as apiClient } from "./client";
export {
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
} from "./services";

// Export all services as namespace
export * as services from "./services";
export * as client from "./client";
