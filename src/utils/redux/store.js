import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";
import tokenReducer from "./tokenSlice";
import accountsReducer from "./accountsSlice";
import transactionsReducer from "./transactionsSlice";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
    token: tokenReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
});
