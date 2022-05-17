import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: [],
  reducers: {
    addAlert: (state, action) => {
      state.push({
        message: action.payload.message,
        type: action.payload.alertType,
        id: action.payload.id,
        time: action.payload.time,
      });
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
