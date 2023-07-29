import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "./FormSlice";

export const store = configureStore({
  reducer: {
    forms: formsReducer,
  },
});
