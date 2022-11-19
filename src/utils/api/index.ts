import {
  login,
  getUserProfile,
  updateUserProfile,
  getAccounts,
  getTransactions,
  getCategories,
  updateTransaction,
} from "./apiHandled";
import * as api from "./apiHandled";

export { login, getUserProfile, updateUserProfile, getAccounts, getTransactions, getCategories, updateTransaction };
export type ApiFunction = ValueOf<typeof api>;
