import { createSlice } from "@reduxjs/toolkit";

const destinationSlice = createSlice({
  name: "destination",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload; // Set selected food item
    },
  },
});

export const { setData } = destinationSlice.actions;
export default destinationSlice.reducer;
