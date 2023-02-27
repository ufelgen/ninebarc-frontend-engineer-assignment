import { configureStore } from "@reduxjs/toolkit";
import searchingSlice from "./searchingSlice";
import currentSearchTermSlice from "./currentSearchTermSlice";
import searchedBooksSlice from "./searchedBooksSlice";
import descriptionSlice from "./descriptionSlice";

export default configureStore({
  reducer: {
    searching: searchingSlice,
    currentSearchTerm: currentSearchTermSlice,
    searchedBooks: searchedBooksSlice,
    description: descriptionSlice,
  },
});
