import { configureStore } from "@reduxjs/toolkit";
import userLocation from "./slices/userLocationSlice";
import dataBase from "./slices/dbSlice";

export default configureStore({
  reducer: {
    userLocation: userLocation,
    dataBase: dataBase,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
}),
});
