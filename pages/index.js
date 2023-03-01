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
import {
  BsFillArrowUpCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import scrollToTop from "../helpers/scrollToTop";
import { useSelector } from "react-redux";
import fetchSearchResults from "@/helpers/fetchSearchResults";
import { useDispatch } from "react-redux";
import { setSearchedBooks } from "../redux/searchedBooksSlice";
import { pageUp, pageDown } from "../redux/pageSlice";

export default function Home() {
  const dispatch = useDispatch();

  const searching = useSelector((state) => state.searching.value);
  const currentSearchTerm = useSelector(
    (state) => state.currentSearchTerm.value
  );
  const searchedBooks = useSelector((state) => state.searchedBooks.value);
  const page = useSelector((state) => state.page.value);

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
    const prevPage = page - 1;
    const searchTermPlus = currentSearchTerm[0].replace(/\s/g, "+");
    const searchTerm = determineSpecification(
      currentSearchTerm[1],
      searchTermPlus
    );

    const matchedBooks = await fetchSearchResults(searchTerm, prevPage);
    dispatch(setSearchedBooks(matchedBooks));
    scrollToTop();

    dispatch(pageDown());
  }

  async function handleNextPage() {
    const nextPage = page + 1;

    const searchTermPlus = currentSearchTerm[0].replace(/\s/g, "+");
    const searchTerm = determineSpecification(
      currentSearchTerm[1],
      searchTermPlus
    );
    const matchedBooks = await fetchSearchResults(searchTerm, nextPage);
    dispatch(setSearchedBooks(matchedBooks));
    scrollToTop();

    dispatch(pageUp());
  }

  function determineMaxPage() {
    if (searchedBooks?.numFound % 100 === 0) {
      const maxPage = searchedBooks?.numFound / 100;
      return maxPage;
    } else {
      const maxPage =
        (searchedBooks?.numFound - (searchedBooks?.numFound % 100)) / 100 + 1;
      return maxPage;
    }
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
                {searchedBooks?.docs && (
                  <>
                    <PaginationBox>
                      <button
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                      >
                        <PrevButton
                          size="7vh"
                          color="darkgrey"
                          className={page === determineMaxPage() && "disabled"}
                        />
                      </button>
                      <span>
                        {page} of {determineMaxPage()}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={page === determineMaxPage()}
                      >
                        <NextButton
                          size="7vh"
                          color="darkgrey"
                          className={page === determineMaxPage() && "disabled"}
                        />
                      </button>
                    </PaginationBox>
                    <TopButton onClick={scrollToTop}>
                      <BsFillArrowUpCircleFill size="7vh" color="darkgrey" />
                    </TopButton>
                  </>
                )}
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
  margin: 0.75rem 1.5rem;
  font-weight: bold;
  color: var(--darkmagenta);
`;

const TopButton = styled.button`
  position: fixed;
  bottom: 12vh;
  right: 1.5rem;
  text-decoration: none;
  background-color: white;
  border-radius: 50%;
  height: 7vh;
  border: none;
`;

const PaginationBox = styled.div`
  width: 60%;
  height: 7vh;
  margin: 1rem 0 12vh 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: bold;
  }

  button {
    border: none;
    background-color: transparent;
    border-radius: 50%;
  }
`;

const PrevButton = styled(BsFillArrowLeftCircleFill)`
  &.disabled {
    background-color: lightgrey;
    border-radius: 50%;
  }
`;

const NextButton = styled(BsFillArrowRightCircleFill)`
  &.disabled {
    background-color: lightgrey;
    border-radius: 50%;
  }
`;
