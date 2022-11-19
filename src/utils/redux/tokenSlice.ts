import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: null as string | null,
  reducers: {
    setToken: (state, action) => {
      return action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
