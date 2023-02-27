import { createSlice } from "@reduxjs/toolkit";

export const searchedBooksSlice = createSlice({
  name: "searchedBooks",
  initialState: {
    value: [],
  },
  reducers: {
    setSearchedBooks: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchedBooks } = searchedBooksSlice.actions;

export default searchedBooksSlice.reducer;
