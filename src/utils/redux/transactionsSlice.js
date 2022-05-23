import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {
    setTransactions: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
