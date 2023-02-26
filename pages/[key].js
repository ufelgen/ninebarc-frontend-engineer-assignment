import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

export default function DetailPage({
  searchedBooks,
  description,
  onUpdateDescription,
}) {
  const router = useRouter();
  const { key } = router.query;

  if (!searchedBooks) {
    return null;
  }
  const currentBook = searchedBooks.docs?.find(
    (book) => book.key.split("/")[2] === key
  );

  if (!currentBook) {
    return null;
  }

  async function getDescription() {
    const response = await fetch(`https://openlibrary.org/works/${key}.json`);
    const matchedBook = await response.json();
    const currentDescription = matchedBook.description;
    onUpdateDescription(currentDescription);
  }

  useEffect(() => {
    getDescription();
  }, []);

  return (
    <Main>
      <ImageContainer>
        <StyledImage
          src={
            Array.isArray(currentBook.isbn)
              ? `https://covers.openlibrary.org/b/isbn/${currentBook.isbn[0]}-L.jpg`
              : `https://covers.openlibrary.org/b/isbn/${currentBook.isbn}-L.jpg`
          }
          fill
          alt={`cover image of ${currentBook.title}`}
        />
      </ImageContainer>
      <BookDetails>
        <p>{currentBook.author_name}</p>
        <h4>{currentBook.title}</h4>
        <p>(first published: {currentBook.first_publish_year})</p>
        <p className="description">
          {!description && "no description available"}
          {description?.value ? description.value : description}
        </p>
      </BookDetails>
    </Main>
  );
}
const Main = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
`;
const ImageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 160vw;
`;

const StyledImage = styled(Image)`
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: -1;
`;

const BookDetails = styled.article`
  position: fixed;
  max-width: 700px;
  top: 70%;
  margin: 0 1.5rem 0 1.5rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    .description {
      font-size: 0.77rem;
    }
  }

  @media (min-width: 769px) {
    font-size: 1.5rem;
    .description {
      font-size: 1rem;
    }
  }
`;
