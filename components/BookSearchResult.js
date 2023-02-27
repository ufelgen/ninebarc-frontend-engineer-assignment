import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export default function BookSearchResult({ book }) {
  return (
    <StyledLink href={`/${book.key.split("/")[2]}`}>
      <SearchResult>
        <Author>author: {book.author_name}</Author>
        <Title>title: {book.title}</Title>
        <StyledImage
          src={
            Array.isArray(book.isbn)
              ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-S.jpg`
              : `https://covers.openlibrary.org/b/isbn/${book.isbn}-S.jpg`
          }
          width={50}
          height={80}
          alt={`cover image of ${book.title}`}
          unoptimized={true}
        />
      </SearchResult>
    </StyledLink>
  );
}

const SearchResult = styled.article`
  border: 2px solid var(--darkmagenta);
  border-radius: 5px;
  margin: 0.5rem;
  padding: 0.25rem;
  background-color: var(--lightgrey);
  display: grid;
  grid-template-columns: 3fr 1fr;
`;
const Author = styled.p`
  grid-column: 1;
  grid-row: 1;
  margin: 0.5rem;
`;
const Title = styled.h4`
  grid-column: 1;
  grid-row: 2;
  margin: 0.5rem;
`;
const StyledImage = styled(Image)`
  grid-column: 2;
  grid-row: 1 / span 2;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
