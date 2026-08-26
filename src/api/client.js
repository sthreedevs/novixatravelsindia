/**
 * API Client Configuration
 * Centralized API communication setup
 */

import axios from "axios";
import { API_BASE_URL, API_TIMEOUT, LOCAL_STORAGE_KEYS } from "../constants";

/**
 * Create axios instance with default config
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor - Add auth token
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      window.location.href = "/auth";
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden");
    }

    return Promise.reject(error);
  }
);

/**
 * GET request
 */
export const get = (url, config = {}) => {
  return apiClient.get(url, config);
};

/**
 * POST request
 */
export const post = (url, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

/**
 * PUT request
 */
export const put = (url, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

/**
 * PATCH request
 */
export const patch = (url, data = {}, config = {}) => {
  return apiClient.patch(url, data, config);
};

/**
 * DELETE request
 */
export const delete_ = (url, config = {}) => {
  return apiClient.delete(url, config);
};

/**
 * Upload file with FormData
 */
export const uploadFile = (url, file, additionalData = {}) => {
  const formData = new FormData();
  formData.append("file", file);

  Object.keys(additionalData).forEach((key) => {
    formData.append(key, additionalData[key]);
  });

  return apiClient.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Upload multiple files
 */
export const uploadFiles = (url, files, additionalData = {}) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  Object.keys(additionalData).forEach((key) => {
    formData.append(key, additionalData[key]);
  });

  return apiClient.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default apiClient;
