import styled from "styled-components";
import { Fragment } from "react";
import Footer from "@/components/Footer";
import BookSearchResult from "@/components/BookSearchResult";
import useLocalStorageState from "use-local-storage-state";

export default function Favourites() {
  const [favourites] = useLocalStorageState("favourites");
  return (
    <>
      {favourites?.map((book) => (
        <Fragment key={book.key}>
          <BookSearchResult book={book} />
        </Fragment>
      ))}
      <Footer />
    </>
  );
}
