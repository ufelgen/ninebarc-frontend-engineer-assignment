import { createSlice } from "@reduxjs/toolkit";

export const searchingSlice = createSlice({
  name: "searching",
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = searchingSlice.actions;

export default searchingSlice.reducer;
