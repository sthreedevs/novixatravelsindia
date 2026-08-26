/**
 * Form Utilities and Helpers
 * Common form handling, validation, and submission logic
 */

import { validateFields } from "../utils/validators";
import { formatDate, objectToQueryString } from "../utils/helpers";

/**
 * Form State Management
 */
export const createFormState = (initialValues = {}) => {
  return {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isDirty: false,
    submitCount: 0,
  };
};

/**
 * Handle Form Input Change
 */
export const handleFormChange = (e, state, setState) => {
  const { name, value, type, checked, files } = e.target;
  const newValue = type === "checkbox" ? checked : type === "file" ? files : value;

  setState({
    ...state,
    values: {
      ...state.values,
      [name]: newValue,
    },
    isDirty: true,
    touched: {
      ...state.touched,
      [name]: true,
    },
  });
};

/**
 * Handle Form Blur (Mark as Touched)
 */
export const handleFormBlur = (e, state, setState) => {
  const { name } = e.target;

  setState({
    ...state,
    touched: {
      ...state.touched,
      [name]: true,
    },
  });
};

/**
 * Reset Form to Initial State
 */
export const resetForm = (initialValues = {}, setState) => {
  setState(createFormState(initialValues));
};

/**
 * Validate Form Fields
 */
export const validateForm = (values, rules, setState) => {
  const errors = validateFields(values, rules);

  setState((state) => ({
    ...state,
    errors,
  }));

  return Object.keys(errors).length === 0;
};

/**
 * Handle Form Submit
 */
export const handleFormSubmit = async (
  e,
  values,
  rules,
  onSubmit,
  state,
  setState
) => {
  e?.preventDefault?.();

  setState((prevState) => ({
    ...prevState,
    submitCount: prevState.submitCount + 1,
  }));

  // Validate before submit
  const isValid = validateForm(values, rules, setState);

  if (!isValid) {
    return false;
  }

  setState((prevState) => ({
    ...prevState,
    isSubmitting: true,
  }));

  try {
    await onSubmit(values);
    return true;
  } catch (error) {
    console.error("Form submission error:", error);
    throw error;
  } finally {
    setState((prevState) => ({
      ...prevState,
      isSubmitting: false,
    }));
  }
};

/**
 * Get Field State (value, error, touched)
 */
export const getFieldState = (fieldName, state) => {
  return {
    value: state.values[fieldName] || "",
    error: state.touched[fieldName] ? state.errors[fieldName] : null,
    isTouched: state.touched[fieldName] || false,
  };
};

/**
 * Form Data Serialization for API
 */
export const serializeFormData = (values, options = {}) => {
  const { includeEmpty = false, dateFields = [] } = options;

  const serialized = {};

  Object.entries(values).forEach(([key, value]) => {
    // Skip empty values unless specified
    if (!includeEmpty && (value === "" || value === null || value === undefined)) {
      return;
    }

    // Format date fields
    if (dateFields.includes(key) && value instanceof Date) {
      serialized[key] = formatDate(value, "YYYY-MM-DD");
    }
    // Handle file uploads
    else if (value instanceof FileList) {
      serialized[key] = Array.from(value);
    } else if (Array.isArray(value)) {
      serialized[key] = value;
    } else {
      serialized[key] = value;
    }
  });

  return serialized;
};

/**
 * Build Query String from Form Values
 */
export const buildFormQueryString = (values) => {
  const filtered = Object.fromEntries(
    Object.entries(values).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
  );
  return objectToQueryString(filtered);
};

/**
 * Check if Form Has Errors
 */
export const hasFormErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

/**
 * Get Form Error Messages
 */
export const getFormErrorMessages = (errors) => {
  return Object.values(errors).filter(Boolean);
};

/**
 * Populate Form from Object
 */
export const populateForm = (data, setState) => {
  setState((state) => ({
    ...state,
    values: {
      ...state.values,
      ...data,
    },
  }));
};

/**
 * Disable Form Submit Button (Based on State)
 */
export const isFormSubmitDisabled = (state) => {
  return (
    state.isSubmitting ||
    hasFormErrors(state.errors) ||
    (!state.isDirty && state.submitCount === 0)
  );
};

/**
 * Clear Form Errors
 */
export const clearFormErrors = (setState) => {
  setState((state) => ({
    ...state,
    errors: {},
  }));
};

/**
 * Set Single Field Error
 */
export const setFieldError = (fieldName, error, setState) => {
  setState((state) => ({
    ...state,
    errors: {
      ...state.errors,
      [fieldName]: error,
    },
    touched: {
      ...state.touched,
      [fieldName]: true,
    },
  }));
};

/**
 * Clear Single Field Error
 */
export const clearFieldError = (fieldName, setState) => {
  setState((state) => ({
    ...state,
    errors: {
      ...state.errors,
      [fieldName]: null,
    },
  }));
};

/**
 * Format Form Data for Multipart Upload
 */
export const createFormDataWithFiles = (values) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value instanceof FileList) {
      Array.from(value).forEach((file) => {
        formData.append(key, file);
      });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

const formHelpers = {
  createFormState,
  handleFormChange,
  handleFormBlur,
  resetForm,
  validateForm,
  handleFormSubmit,
  getFieldState,
  serializeFormData,
  buildFormQueryString,
  hasFormErrors,
  getFormErrorMessages,
  populateForm,
  isFormSubmitDisabled,
  clearFormErrors,
  setFieldError,
  clearFieldError,
  createFormDataWithFiles,
};

export default formHelpers;
