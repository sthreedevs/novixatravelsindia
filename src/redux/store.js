import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import destinationSlice from "./destinationSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    destination: destinationSlice,
  },
});

export default store;
