import { createSlice } from "@reduxjs/toolkit";

export const currentSearchTermSlice = createSlice({
  name: "currentSearchTerm",
  initialState: {
    value: "",
  },
  reducers: {
    setCurrentSearchTerm: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentSearchTerm } = currentSearchTermSlice.actions;

export default currentSearchTermSlice.reducer;
