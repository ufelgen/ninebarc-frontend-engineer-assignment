import Head from "next/head";
import { Fragment } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import BookSearchResult from "@/components/BookSearchResult";
import NoResults from "@/components/NoResults";
import LottieBook from "../public/Lottie/LottieBook";

export default function Home({
  onUpdateSearchedBooks,
  searchedBooks,
  onUpdateCurrentSearchTerm,
  currentSearchTerm,
  toggleSearching,
  searching,
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
          toggleSearching={toggleSearching}
        />
        {searching ? (
          <>
            <CurrentSearchTerm>
              searching for: "{currentSearchTerm}"
            </CurrentSearchTerm>
            <Lottie animationData={LottieBook} loop={true} />
          </>
        ) : (
          <>
            {" "}
            {currentSearchTerm !== "" && (
              <CurrentSearchTerm>
                you searched for: "{currentSearchTerm}"
              </CurrentSearchTerm>
            )}
            {searchedBooks.numFound === 0 ? (
              <NoResults />
            ) : (
              <>
                {searchedBooks.docs?.map((book) => (
                  <Fragment key={book.key}>
                    <BookSearchResult book={book} />
                  </Fragment>
                ))}
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

const CurrentSearchTerm = styled.p`
  margin: 1rem;
  font-weight: bold;
  color: var(--darkmagenta);
`;
