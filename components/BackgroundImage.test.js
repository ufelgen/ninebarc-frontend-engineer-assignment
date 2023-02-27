import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackgroundImage from "./BackgroundImage";
import { book, anotherBook } from "../helpers/testBooks";

test("correct background is rendered according to isbn (array)", () => {
  render(<BackgroundImage currentBook={book} />);
  const image = screen.getByAltText("cover image of The Light Fantastic");
  expect(image).toHaveAttribute(
    "src",
    "https://covers.openlibrary.org/b/isbn/9783453165892-L.jpg"
  );
});

test("correct background is rendered according to isbn (string)", () => {
  render(<BackgroundImage currentBook={anotherBook} />);
  const image = screen.getByAltText(
    "cover image of Harry Potter and the Philosopher's Stone"
  );
  expect(image).toHaveAttribute(
    "src",
    "https://covers.openlibrary.org/b/isbn/9788700398368-L.jpg"
  );
});
