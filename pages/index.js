import Head from "next/head";
import { Fragment } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import BookSearchResult from "@/components/BookSearchResult";
import NoResults from "@/components/NoResults";
import Footer from "@/components/Footer";
import LottieBook from "../public/Lottie/LottieBook";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import scrollToTop from "../helpers/scrollToTop";
import { useSelector } from "react-redux";
import fetchSearchResults from "@/helpers/fetchSearchResults";
import { useDispatch } from "react-redux";
import { setSearchedBooks } from "../redux/searchedBooksSlice";

export default function Home() {
  let page = 1;
  const dispatch = useDispatch();

  const searching = useSelector((state) => state.searching.value);
  const currentSearchTerm = useSelector(
    (state) => state.currentSearchTerm.value
  );
  const searchedBooks = useSelector((state) => state.searchedBooks.value);

  function determineSpecification(specification, searchTermPlus) {
    if (specification === "none" || specification === "") {
      const searchTerm = "q=" + searchTermPlus;
      return searchTerm;
    } else if (specification === "author") {
      const searchTerm = "author=" + searchTermPlus;
      return searchTerm;
    } else if (specification === "title") {
      const searchTerm = "title=" + searchTermPlus;
      return searchTerm;
    }
  }
  async function handlePreviousPage() {
    const searchTermPlus = currentSearchTerm[0].replace(/\s/g, "+");
    const searchTerm = determineSpecification(
      currentSearchTerm[1],
      searchTermPlus
    );

    if (page === 1) {
      //prevButton.disabled = true;
      return;
    }
    /*if (page < 42) {
      nextButton.disabled = false;
    } */
    page--;
    const matchedBooks = await fetchSearchResults(searchTerm, page);
    dispatch(setSearchedBooks(matchedBooks));
    scrollToTop();

    console.log("page", page);
  }

  async function handleNextPage() {
    page++;

    const searchTermPlus = currentSearchTerm[0].replace(/\s/g, "+");
    const searchTerm = determineSpecification(
      currentSearchTerm[1],
      searchTermPlus
    );
    const matchedBooks = await fetchSearchResults(searchTerm, page);
    dispatch(setSearchedBooks(matchedBooks));
    scrollToTop();

    /*     if (page > 1) {
      prevButton.disabled = false;
    }
    if (page === maxPage) {
      nextButton.disabled = true;
    } */

    console.log("page", page);
  }

  return (
    <>
      <Head>
        <title>Book Quest</title>
      </Head>
      <Header />
      <Main>
        <SearchForm onDetermineSpecification={determineSpecification} />
        {searching ? (
          <>
            <CurrentSearchTerm>
              searching for: &quot;{currentSearchTerm[0]}&quot;
            </CurrentSearchTerm>
            <Lottie
              animationData={LottieBook}
              loop={true}
              style={{
                bottom: "10%",
                zIndex: -1,
                overflow: "hidden",
                position: "fixed",
              }}
            />
          </>
        ) : (
          <>
            {currentSearchTerm !== "" && (
              <CurrentSearchTerm>
                you searched for: &quot;{currentSearchTerm}&quot;
              </CurrentSearchTerm>
            )}
            {searchedBooks?.numFound === 0 ? (
              <NoResults />
            ) : (
              <>
                {searchedBooks?.docs?.map((book) => (
                  <Fragment key={book.key}>
                    <BookSearchResult book={book} />
                  </Fragment>
                ))}
                <button onClick={handlePreviousPage}>prev</button>
                <button onClick={handleNextPage}>next</button>
                <TopButton onClick={scrollToTop}>
                  <BsFillArrowUpCircleFill size="7vh" color="darkgrey" />
                </TopButton>
              </>
            )}
          </>
        )}
        <Footer />
      </Main>
    </>
  );
}

const Main = styled.main`
  position: relative;
  margin-bottom: 11vh;
`;

const CurrentSearchTerm = styled.p`
  margin: 1rem;
  font-weight: bold;
  color: var(--darkmagenta);
`;

const TopButton = styled.button`
  position: fixed;
  bottom: 12%;
  right: 5%;
  text-decoration: none;
  background-color: white;
  border-radius: 50%;
  height: 7vh;
  border: none;
`;

const NextButton = styled.button``;
