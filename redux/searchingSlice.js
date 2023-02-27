import { createSlice } from "@reduxjs/toolkit";

export const searchingSlice = createSlice({
  name: "searching",
  initialState: {
    value: false,
  },
  reducers: {
    toggleSearching: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSearching } = searchingSlice.actions;

export default searchingSlice.reducer;
