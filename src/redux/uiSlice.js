import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: true, // window.matchMedia("(prefers-color-scheme: dark)").matches
    modalForm: null, // Stores the selected food item
  },
  reducers: {
    setModalForm: (state, action) => {
      state.modalForm = action.payload; // Set selected food item
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode; // Set selected food item
    },
  },
});

export const { setModalForm, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
