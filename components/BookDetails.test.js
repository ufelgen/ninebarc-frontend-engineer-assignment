import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookDetails from "./BookDetails";

test("renders the book details with the correct information", () => {
  const currentBook = {
    author_name: "Terry Pratchett",
    title: "The Light Fantastic",
    first_publish_year: "1986",
  };
  const description =
    "From the back cover: In *The Light Fantastic* only one individual can save the world from a disastrous collision. Unfortunately, the hero happens to be the singularly inept wizard Rincewind, who was last seen falling off the edge of the world...";
  render(<BookDetails currentBook={currentBook} description={description} />);
  const author = screen.getByText("Terry Pratchett");
  const title = screen.getByText("The Light Fantastic");
  const date = screen.getByText("(first published: 1986)");
  const descriptionText = screen.getByTestId("description");
  expect(author).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(descriptionText).toBeInTheDocument();
});
