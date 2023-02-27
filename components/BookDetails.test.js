import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookDetails from "./BookDetails";
import { book, description } from "../helpers/testBooks";

test("renders the book details with the correct information", () => {
  render(<BookDetails currentBook={book} description={description} />);
  const author = screen.getByText("Terry Pratchett");
  const title = screen.getByText("The Light Fantastic");
  const date = screen.getByText("(first published: 1986)");
  const descriptionText = screen.getByTestId("description");
  expect(author).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(descriptionText).toBeInTheDocument();
});
