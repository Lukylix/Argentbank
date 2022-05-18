import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";
import tokenReducer from "./tokenSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
    token: tokenReducer,
  },
});
