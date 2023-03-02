import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";
import store from "../redux/store";
import { Provider } from "react-redux";

test("renders the correct form elements", async () => {
  render(
    <Provider store={store}>
      <SearchForm />
    </Provider>
  );

  const inputField = screen.getByLabelText("Search for a book title or author");
  const submitButton = screen.getByRole("button", {
    name: "submit your search",
  });

  expect(inputField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("resets the form after submit", async () => {
  const user = userEvent.setup();
  const onDetermineSpecification = jest.fn();

  render(
    <Provider store={store}>
      <SearchForm onDetermineSpecification={onDetermineSpecification} />
    </Provider>
  );

  const inputField = screen.getByLabelText("Search for a book title or author");
  const submitButton = screen.getByRole("button", {
    name: "submit your search",
  });

  await user.type(inputField, "the light fantastic");
  expect(inputField).toHaveValue("the light fantastic");

  await user.click(submitButton);
  expect(inputField).toHaveValue("");
  //expect(setCurrentSearchTerm).toHaveBeenCalledWith("the light fantastic");
});
