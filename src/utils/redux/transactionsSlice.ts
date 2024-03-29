import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [] as ITransaction[],
  } as ITransactionBody,
  reducers: {
    setTransactions: (state, action) => {
      return action.payload;
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);
      state.transactions[index] = action.payload;
    },
  },
});

export const { setTransactions, updateTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
