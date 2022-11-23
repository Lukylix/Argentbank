import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: [] as IAlert[],
  reducers: {
    addAlert: (state, { payload: { message, type, id, time } }: { payload: IAlert }) => {
      state.push({
        message,
        type,
        id,
        time,
      });
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
