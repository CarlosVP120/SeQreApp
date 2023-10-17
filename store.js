import { configureStore } from "@reduxjs/toolkit";
import userLocation from "./slices/userLocationSlice";

export default configureStore({
  reducer: {
    userLocation: userLocation,
  },
});
