import Head from "next/head";
import { Fragment } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import BookSearchResult from "@/components/BookSearchResult";
import NoResults from "@/components/NoResults";
import LottieBook from "../public/Lottie/LottieBook";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import scrollToTop from "../helpers/scrollToTop";

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
                <TopButton onClick={scrollToTop}>
                  <BsFillArrowUpCircleFill size="7vh" />
                </TopButton>
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

const TopButton = styled.button`
  position: fixed;
  bottom: 5%;
  right: 5%;
  text-decoration: none;
  background-color: white;
  border-radius: 50%;
  height: 7vh;
`;
