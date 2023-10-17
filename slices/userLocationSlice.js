import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocation } = locationSlice.actions;

export const selectLocation = (state) => state.userLocation.location;

export default locationSlice.reducer;
