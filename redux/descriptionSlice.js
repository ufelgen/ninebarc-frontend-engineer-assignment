import { createSlice } from "@reduxjs/toolkit";

export const descriptionSlice = createSlice({
  name: "description",
  initialState: {
    value: "",
  },
  reducers: {
    setDescription: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDescription } = descriptionSlice.actions;

export default descriptionSlice.reducer;
