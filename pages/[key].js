import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BackgroundImage from "@/components/BackgroundImage";
import BookDetails from "@/components/BookDetails";
import NothingHere from "@/components/NothingHere";

export default function DetailPage({
  searchedBooks,
  description,
  onUpdateDescription,
}) {
  const router = useRouter();
  const { key } = router.query;

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
      onUpdateDescription(currentDescription);
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
      </Main>
    </>
  );
}
const Main = styled.main`
  display: flex;
  justify-content: center;
`;
