import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BackgroundImage from "@/components/BackgroundImage";
import BookDetails from "@/components/BookDetails";
import NothingHere from "@/components/NothingHere";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setDescription } from "@/redux/descriptionSlice";

export default function DetailPage() {
  const router = useRouter();
  const { key } = router.query;

  const searchedBooks = useSelector((state) => state.searchedBooks.value);
  const description = useSelector((state) => state.description.value);
  const dispatch = useDispatch();

  if (!searchedBooks) {
    return <NothingHere />;
  }
  const currentBook = searchedBooks.docs?.find(
    (book) => book.key.split("/")[2] === key
  );

  if (!currentBook) {
    return <NothingHere />;
  }

  async function getDescription() {
    try {
      const response = await fetch(`https://openlibrary.org/works/${key}.json`);
      const matchedBook = await response.json();
      const currentDescription = matchedBook.description;
      dispatch(setDescription(currentDescription));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDescription();
  }, []);

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
  height: 7vh;
  width: 7vh;
`;
