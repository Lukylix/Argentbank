import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: [] as IAlert[],
  reducers: {
    addAlert: (
      state,
      { payload: { message, type, startTime = Date.now(), duration = 4000 } }: { payload: IAddAlertPayload }
    ) => {
      const sameAlertIndex = state.findIndex((alert) => alert.message === message);
      if (sameAlertIndex === -1) {
        state.push({
          message,
          type,
          startTime,
          duration,
        });
        return;
      }
      const sameAlertEndingTime = state[sameAlertIndex].startTime + state[sameAlertIndex].duration;
      const desiredEndingTime = startTime + duration;
      const newDesiredDuration = desiredEndingTime - sameAlertEndingTime + state[sameAlertIndex].duration;
      state[sameAlertIndex] = { ...state[sameAlertIndex], duration: newDesiredDuration };
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.startTime !== action.payload);
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
