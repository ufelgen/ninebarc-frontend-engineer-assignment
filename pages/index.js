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
import { useSelector } from "react-redux";

export default function Home() {
  const searchingTestiHuhu = useSelector((state) => state.searching.value);
  const currentSearchTermTestiHuhu = useSelector(
    (state) => state.currentSearchTerm.value
  );
  const searchedBooksHuhuTesti = useSelector(
    (state) => state.searchedBooks.value
  );
  return (
    <>
      <Head>
        <title>Book Quest</title>
      </Head>
      <Header />
      <main>
        <SearchForm />
        {searchingTestiHuhu ? (
          <>
            <CurrentSearchTerm>
              searching for: "{currentSearchTermTestiHuhu}"
            </CurrentSearchTerm>
            <Lottie animationData={LottieBook} loop={true} />
          </>
        ) : (
          <>
            {" "}
            {currentSearchTermTestiHuhu !== "" && (
              <CurrentSearchTerm>
                you searched for: "{currentSearchTermTestiHuhu}"
              </CurrentSearchTerm>
            )}
            {searchedBooksHuhuTesti.numFound === 0 ? (
              <NoResults />
            ) : (
              <>
                {searchedBooksHuhuTesti.docs?.map((book) => (
                  <Fragment key={book.key}>
                    <BookSearchResult book={book} />
                  </Fragment>
                ))}
                <TopButton onClick={scrollToTop}>
                  <BsFillArrowUpCircleFill size="7vh" color="darkgrey" />
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
  border: none;
`;
