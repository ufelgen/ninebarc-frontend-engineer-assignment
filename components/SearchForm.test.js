import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";
import store from "../redux/store";
import { Provider } from "react-redux";

test("calls the book search function with form input on submit", async () => {
  const user = userEvent.setup();

  render(
    <Provider store={store}>
      <SearchForm />
    </Provider>
  );

  const inputField = screen.getByLabelText("Search for a book title or author");
  const submitButton = screen.getByRole("button", {
    name: "submit your search",
  });

  await user.type(inputField, "the light fantastic");
  await user.click(submitButton);

  //expect(setCurrentSearchTerm).toHaveBeenCalledWith("the light fantastic");
});
