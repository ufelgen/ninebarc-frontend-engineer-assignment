import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";
// import fetchSearchResults from "../helpers/fetchSearchResults";

test("calls the book search function with form input on submit", async () => {
  const user = userEvent.setup();
  const handleUpdateCurrentSearchTerm = jest.fn();
  const handleUpdateSearchedBooks = jest.fn();
  const getBooks = jest.fn();

  render(
    <SearchForm
      onUpdateCurrentSearchTerm={handleUpdateCurrentSearchTerm}
      onUpdateSearchedBooks={handleUpdateSearchedBooks}
    />
  );

  const inputField = screen.getByLabelText("Search for a book title or author");
  const submitButton = screen.getByRole("button", {
    name: "submit your search",
  });

  await user.type(inputField, "the light fantastic");
  await user.click(submitButton);
  expect(handleUpdateCurrentSearchTerm).toHaveBeenCalledWith(
    "the light fantastic"
  );
});
