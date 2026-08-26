/**
 * Helper Utilities
 * Common functions used throughout the application
 */

/**
 * Format date to readable format
 */
export const formatDate = (date, format = "MMM DD, YYYY") => {
  if (!date) return "";
  const d = new Date(date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNumber = String(d.getMonth() + 1).padStart(2, "0");
  const dayNumber = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  
  return format
    .replace("MMM", months[d.getMonth()])
    .replace("DD", dayNumber)
    .replace("YYYY", year)
    .replace("MM", monthNumber);
};

/**
 * Format time duration (e.g., 3600000ms => "1h 0m")
 */
export const formatDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(seconds / 3600) % 24;
  const days = Math.floor(seconds / 86400);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = "INR") => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  });
  return formatter.format(amount);
};

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-IN").format(num);
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100, suffix = "...") => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to title case
 */
export const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Convert string to kebab case
 */
export const toKebabCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/**
 * Convert string to camelCase
 */
export const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
};

/**
 * Generate unique ID
 */
export const generateId = (prefix = "") => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `${prefix}${timestamp}${randomStr}`.toUpperCase();
};

/**
 * Check if value is empty
 */
export const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Merge objects deeply
 */
export const deepMerge = (target, source) => {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  
  return output;
};

/**
 * Check if value is object
 */
export const isObject = (obj) => {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit) => {
  let lastRun = 0;
  
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func(...args);
      lastRun = now;
    }
  };
};

/**
 * Sleep/delay function
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Get value from nested object
 */
export const getNestedValue = (obj, path, defaultValue = undefined) => {
  const keys = path.split(".");
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }
  
  return result;
};

/**
 * Set value in nested object
 */
export const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  return obj;
};

/**
 * Filter object by keys
 */
export const filterObjectKeys = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

/**
 * Omit keys from object
 */
export const omitObjectKeys = (obj, keysToOmit) => {
  return Object.keys(obj).reduce((result, key) => {
    if (!keysToOmit.includes(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

/**
 * Convert query string to object
 */
export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(params);
};

/**
 * Convert object to query string
 */
export const objectToQueryString = (obj) => {
  return Object.entries(obj)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Get color from string (for avatars)
 */
export const getColorFromString = (str) => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
  ];
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Retry function with exponential backoff
 */
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        await sleep(delay);
      }
    }
  }
  
  throw lastError;
};

/**
 * Batch array items
 */
export const batchArray = (array, batchSize) => {
  const batches = [];
  for (let i = 0; i < array.length; i += batchSize) {
    batches.push(array.slice(i, i + batchSize));
  }
  return batches;
};

const helpers = {
  formatDate,
  formatDuration,
  formatCurrency,
  formatNumber,
  truncateText,
  capitalize,
  toTitleCase,
  toKebabCase,
  toCamelCase,
  generateId,
  isEmpty,
  deepClone,
  deepMerge,
  isObject,
  debounce,
  throttle,
  sleep,
  getNestedValue,
  setNestedValue,
  filterObjectKeys,
  omitObjectKeys,
  parseQueryString,
  objectToQueryString,
  getInitials,
  getColorFromString,
  retryWithBackoff,
  batchArray,
};

export default helpers;
