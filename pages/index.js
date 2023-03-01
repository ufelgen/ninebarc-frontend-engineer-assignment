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

export default function Home() {
  const searching = useSelector((state) => state.searching.value);
  const currentSearchTerm = useSelector(
    (state) => state.currentSearchTerm.value
  );
  const searchedBooks = useSelector((state) => state.searchedBooks.value);
  return (
    <>
      <Head>
        <title>Book Quest</title>
      </Head>
      <Header />
      <Main>
        <SearchForm />
        {searching ? (
          <>
            <CurrentSearchTerm>
              searching for: &quot;{currentSearchTerm}&quot;
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

const StyledAnimation = styled(Lottie)`
  position: fixed;
  bottom: 30vh;
`;
