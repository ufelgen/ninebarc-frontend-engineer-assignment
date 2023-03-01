import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    value: 1,
  },
  reducers: {
    pageUp: (state) => {
      state.value += 1;
    },
    pageDown: (state) => {
      state.value -= 1;
    },
    resetPage: (state) => {
      state.value = 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pageUp, pageDown, resetPage } = pageSlice.actions;

export default pageSlice.reducer;
