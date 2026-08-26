/**
 * Redux Utilities
 * Helper functions for Redux operations and state management
 */

/**
 * Create Async Thunk Handlers
 * Generic handler for pending, fulfilled, rejected states
 */
export const createAsyncHandlers = (actionName) => {
  return {
    pending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fulfilled: (state, action) => {
      state.loading = false;
      state.error = null;
      return { ...state, ...action.payload };
    },
    rejected: (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    },
  };
};

/**
 * Create Async State
 * Initialize state for async operations
 */
export const createAsyncState = (initialData = null) => {
  return {
    data: initialData,
    loading: false,
    error: null,
    status: "idle", // idle | loading | succeeded | failed
  };
};

/**
 * Normalize Array of Objects by ID
 * Convert array to object with id as key
 */
export const normalizeData = (array = [], idField = "id") => {
  return array.reduce((acc, item) => {
    acc[item[idField]] = item;
    return acc;
  }, {});
};

/**
 * Denormalize Data
 * Convert object back to array
 */
export const denormalizeData = (obj = {}) => {
  return Object.values(obj);
};

/**
 * Update Item in Normalized State
 */
export const updateNormalizedItem = (state, id, updates) => {
  if (state[id]) {
    state[id] = { ...state[id], ...updates };
  }
};

/**
 * Remove Item from Normalized State
 */
export const removeNormalizedItem = (state, id) => {
  delete state[id];
};

/**
 * Add Item to Normalized State
 */
export const addNormalizedItem = (state, item, idField = "id") => {
  state[item[idField]] = item;
};

/**
 * Create Selector for Normalized Data
 */
export const createNormalizedSelector = (selectNormalized) => (state) => {
  const normalized = selectNormalized(state);
  return denormalizeData(normalized);
};

/**
 * Create Entity Selector
 * Select single item by id
 */
export const createEntitySelector = (selectNormalized, id) => (state) => {
  const normalized = selectNormalized(state);
  return normalized[id] || null;
};

/**
 * Create Filtered Selector
 * Select items matching filter condition
 */
export const createFilteredSelector = (selectArray, filterFn) => (state) => {
  const items = selectArray(state);
  return Array.isArray(items) ? items.filter(filterFn) : [];
};

/**
 * Merge Slice States
 * Combine multiple slice states
 */
export const mergeSliceStates = (...sliceStates) => {
  return Object.assign({}, ...sliceStates);
};

/**
 * Create Action Payload Creator
 */
export const createPayloadCreator = (transformFn) => (args) => {
  return transformFn(args);
};

/**
 * Batch Update State
 * Update multiple values in state
 */
export const batchUpdateState = (state, updates) => {
  return { ...state, ...updates };
};

/**
 * Create Reducer Map
 * Create handler map for extraReducers
 */
export const createReducerMap = (asyncThunk, handlers) => {
  return {
    [asyncThunk.pending]: handlers.pending,
    [asyncThunk.fulfilled]: handlers.fulfilled,
    [asyncThunk.rejected]: handlers.rejected,
  };
};

/**
 * Local Storage Persist Middleware
 * Persist specific state to localStorage
 */
export const createLocalStoragePersister = (key) => {
  return {
    load: () => {
      try {
        const state = localStorage.getItem(key);
        return state ? JSON.parse(state) : null;
      } catch (error) {
        console.error(`Error loading state from localStorage: ${key}`, error);
        return null;
      }
    },
    save: (state) => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error(`Error saving state to localStorage: ${key}`, error);
      }
    },
    clear: () => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error clearing state from localStorage: ${key}`, error);
      }
    },
  };
};

/**
 * Create Reusable Slice Reducer
 * Generic CRUD reducer factory
 */
export const createCrudSliceReducers = () => {
  return {
    setData: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    addData: (state, action) => {
      if (Array.isArray(state.data)) {
        state.data.push(action.payload);
      } else {
        state.data = action.payload;
      }
      state.error = null;
    },
    updateData: (state, action) => {
      const { id, updates } = action.payload;
      if (Array.isArray(state.data)) {
        const index = state.data.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...updates };
        }
      }
      state.error = null;
    },
    removeData: (state, action) => {
      if (Array.isArray(state.data)) {
        state.data = state.data.filter((item) => item.id !== action.payload);
      }
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  };
};

/**
 * Get State Path
 * Navigate nested state safely
 */
export const getStatePath = (state, path, defaultValue = null) => {
  const keys = path.split(".");
  let current = state;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }

  return current;
};

/**
 * Set State Path
 * Set value at nested path in state
 */
export const setStatePath = (state, path, value) => {
  const keys = path.split(".");
  let current = state;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
};

/**
 * Create Selector with Memoization
 */
export const memoizeSelector = (selector) => {
  let lastState = null;
  let lastResult = null;

  return (state) => {
    if (state !== lastState) {
      lastState = state;
      lastResult = selector(state);
    }
    return lastResult;
  };
};

const utils = {
  createAsyncHandlers,
  createAsyncState,
  normalizeData,
  denormalizeData,
  updateNormalizedItem,
  removeNormalizedItem,
  addNormalizedItem,
  createNormalizedSelector,
  createEntitySelector,
  createFilteredSelector,
  mergeSliceStates,
  createPayloadCreator,
  batchUpdateState,
  createReducerMap,
  createLocalStoragePersister,
  createCrudSliceReducers,
  getStatePath,
  setStatePath,
  memoizeSelector,
};

export default utils;
