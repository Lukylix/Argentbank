import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "Categories",
  initialState: [] as ICategory[],
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
