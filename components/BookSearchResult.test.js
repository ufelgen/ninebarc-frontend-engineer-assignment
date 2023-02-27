import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookSearchResult from "./BookSearchResult";

const book = {
  key: "/works/OL453680W",
  author_name: "Terry Pratchett",
  title: "The Light Fantastic",
  first_publish_year: "1986",
  isbn: [
    "9783453165892",
    "0552152234",
    "9780060855888",
    "3453034503",
    "9780451152978",
    "9781473205338",
    "0451162412",
    "9780312486037",
    "9780753107393",
    "0552128481",
    "9780552128483",
    "9789022533864",
    "0606318402",
    "1856953998",
    "9780552152594",
    "055214018X",
    "5699156275",
    "0061367591",
    "9783453034501",
    "9788497931786",
    "0552152595",
    "0061020702",
    "9788401479441",
    "9781856953993",
    "9781856953696",
    "0062225685",
    "2266071556",
    "9780552140188",
    "0061367621",
    "9780606318402",
    "9780861402038",
    "9782266071550",
    "0061367605",
    "9780552166607",
    "9780061367601",
    "0060855886",
    "9780061367571",
    "055216660X",
    "1407034391",
    "3453165896",
    "9780062225689",
    "8401479444",
    "9788085609295",
    "0575061642",
    "9780061801150",
    "9780552152235",
    "9783492280488",
    "0861402030",
    "0061367613",
    "2841726908",
    "9782905158758",
    "3453162803",
    "349228048X",
    "0312486030",
    "9780451162410",
    "0753107392",
    "1856953696",
    "9781856958318",
    "2905158751",
    "8085609290",
    "9780061367618",
    "9781407034393",
    "9780061020704",
    "9780061367595",
    "9780061367625",
    "1856958310",
    "9786052349830",
    "0613279387",
    "9782841726905",
    "0061367575",
    "9022533867",
    "0451152972",
    "9783453162808",
    "8497931785",
    "9780575061644",
    "0061801151",
    "6052349832",
    "9780613279383",
    "1473205336",
    "226621182X",
    "9782266211826",
    "9780061367588",
    "0061367583",
    "9785699156276",
  ],
};

const anotherBook = {
  key: "/works/OL82563W",
  author_name: "J. K. Rowling",
  title: "Harry Potter and the Philosopher's Stone",
  first_publish_year: "1997",
  isbn: "9788700398368",
};

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
