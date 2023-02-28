import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BackgroundImage from "@/components/BackgroundImage";
import BookDetails from "@/components/BookDetails";
import NothingHere from "@/components/NothingHere";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setDescription } from "@/redux/descriptionSlice";
import useLocalStorageState from "use-local-storage-state";
import { current } from "@reduxjs/toolkit";

export default function DetailPage({
  onAddToFavourites,
  onRemoveFromFavourites,
}) {
  const router = useRouter();
  const { key } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    async function getDescription() {
      try {
        const response = await fetch(
          `https://openlibrary.org/works/${key}.json`
        );
        const matchedBook = await response.json();
        const currentDescription = matchedBook.description;
        dispatch(setDescription(currentDescription));
      } catch (error) {
        console.error(error);
      }
    }
    getDescription();
  }, [key]);

  const searchedBooks = useSelector((state) => state.searchedBooks.value);
  const description = useSelector((state) => state.description.value);
  const [favourites] = useLocalStorageState("favourites");

  function getCurrentBook() {
    if (searchedBooks.docs?.find((book) => book.key.split("/")[2] === key)) {
      const currentBook = searchedBooks.docs?.find(
        (book) => book.key.split("/")[2] === key
      );
      return currentBook;
    } else {
      const currentBook = favourites.find(
        (book) => book.key.split("/")[2] === key
      );

      return currentBook;
    }
  }

  const currentBook = getCurrentBook();

  if (!currentBook) {
    return <NothingHere />;
  }

  function determineIfIsFavourite() {
    const isFavourite = favourites.find((book) => book.key === currentBook.key);
    return isFavourite;
  }

  return (
    <>
      <Head>
        <title>Book Quest</title>
      </Head>
      <Main>
        <BackgroundImage currentBook={currentBook} />
        <BookDetails currentBook={currentBook} description={description} />
        <StyledLink href="/">
          <BsFillArrowLeftCircleFill size="7vh" color="darkgrey" />
        </StyledLink>
        {determineIfIsFavourite() ? (
          <FavouritesButton onClick={() => onRemoveFromFavourites(currentBook)}>
            <IoIosHeart size="6vh" color="darkgrey" />
          </FavouritesButton>
        ) : (
          <FavouritesButton onClick={() => onAddToFavourites(currentBook)}>
            <IoIosHeartEmpty size="6vh" color="darkgrey" />
          </FavouritesButton>
        )}
      </Main>
    </>
  );
}
const Main = styled.main`
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledLink = styled(Link)`
  position: fixed;
  top: 5%;
  left: 5%;
  text-decoration: none;
  background-color: white;
  border-radius: 50%;
  border: none;
  height: 7vh;
  width: 7vh;
`;

const FavouritesButton = styled.button`
  position: fixed;
  top: 5%;
  right: 5%;
  background-color: white;
  border: none;
  border-radius: 50%;
  height: 7vh;
  width: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
