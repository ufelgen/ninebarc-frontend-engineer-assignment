import Head from "next/head";
import { Fragment } from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import BookSearchResult from "@/components/BookSearchResult";

export default function Home({
  onUpdateSearchedBooks,
  searchedBooks,
  onUpdateCurrentSearchTerm,
  currentSearchTerm,
}) {
  return (
    <>
      <Head>
        <title>Book Quest</title>
      </Head>
      <Header />
      <main>
        <SearchForm
          onUpdateCurrentSearchTerm={onUpdateCurrentSearchTerm}
          onUpdateSearchedBooks={onUpdateSearchedBooks}
        />
        {currentSearchTerm !== "" && (
          <CurrentSearchTerm>
            search results for: "{currentSearchTerm}"
          </CurrentSearchTerm>
        )}
        {searchedBooks.docs?.map((book) => (
          <Fragment key={book.key}>
            <BookSearchResult book={book} />
          </Fragment>
        ))}
      </main>
    </>
  );
}

const CurrentSearchTerm = styled.p`
  margin: 1rem;
  font-weight: bold;
  color: var(--darkmagenta);
`;
