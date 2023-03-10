import styled from "styled-components";
import Head from "next/head";
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
      const currentBook = favourites?.find(
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

  function determineIfCurrentBookIsPartOfSearchedBooks() {
    const isPart = searchedBooks.docs?.find(
      (book) => book.key === currentBook.key
    );
    return isPart;
  }

  function handleRemoveFromFavouritesFinal(currentBook) {
    const confirmation = confirm(
      "do you really want to remove this book from your favourites?"
    );
    if (confirmation && determineIfCurrentBookIsPartOfSearchedBooks()) {
      onRemoveFromFavourites(currentBook);
    } else if (confirmation && !determineIfCurrentBookIsPartOfSearchedBooks()) {
      onRemoveFromFavourites(currentBook);
      router.push("/favourites");
    }
  }

  return (
    <>
      <Head>
        <title>Book Quest</title>
      </Head>
      <Main>
        <BackgroundImage currentBook={currentBook} />
        <BookDetails currentBook={currentBook} description={description} />
        <ButtonBox>
          <BackButton onClick={() => router.back()}>
            <BsFillArrowLeftCircleFill size="7vh" color="darkgrey" />
          </BackButton>
          {determineIfIsFavourite() ? (
            <FavouritesButton
              onClick={() => handleRemoveFromFavouritesFinal(currentBook)}
            >
              <IoIosHeart size="6vh" color="darkgrey" />
            </FavouritesButton>
          ) : (
            <FavouritesButton onClick={() => onAddToFavourites(currentBook)}>
              <IoIosHeartEmpty size="6vh" color="darkgrey" />
            </FavouritesButton>
          )}
        </ButtonBox>
      </Main>
    </>
  );
}
const Main = styled.main`
  display: flex;
  justify-content: center;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 5%;
  text-decoration: none;
  background-color: white;
  border-radius: 50%;
  border: none;
  height: 7vh;
  width: 7vh;
`;

const FavouritesButton = styled.button`
  position: absolute;
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

const ButtonBox = styled.div`
  width: 100%;
  max-width: 800px;
  position: fixed;
  top: 5%;
`;
