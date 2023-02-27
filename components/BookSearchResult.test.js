import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookSearchResult from "./BookSearchResult";
import { book, anotherBook } from "../helpers/testBooks";

test("link has the correct href attribute", () => {
  render(<BookSearchResult book={book} />);
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "/OL453680W");
});

test("correct image is rendered according to isbn (array)", () => {
  render(<BookSearchResult book={book} />);
  const image = screen.getByAltText("cover image of The Light Fantastic");
  expect(image).toHaveAttribute(
    "src",
    "https://covers.openlibrary.org/b/isbn/9783453165892-S.jpg"
  );
});

test("correct image is rendered according to isbn (string)", () => {
  render(<BookSearchResult book={anotherBook} />);
  const image = screen.getByAltText(
    "cover image of Harry Potter and the Philosopher's Stone"
  );
  expect(image).toHaveAttribute(
    "src",
    "https://covers.openlibrary.org/b/isbn/9788700398368-S.jpg"
  );
});
