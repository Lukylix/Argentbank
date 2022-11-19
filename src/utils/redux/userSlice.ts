import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {} as UserProfile,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    setUserNames: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setUser, setUserNames } = userSlice.actions;

export default userSlice.reducer;
