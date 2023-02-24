import Head from "next/head";
import styled from "styled-components";

export default function Home({ onUpdateSearchedBooks, searchedBooks }) {
  async function getBooks(event) {
    event.preventDefault();
    const searchTerm = event.target.elements.searchTerm.value.replace(
      /\s/g,
      "+"
    );

    const response = await fetch(
      "https://openlibrary.org/search.json?q=" + searchTerm
    );
    const matchedBooks = await response.json();
    onUpdateSearchedBooks(matchedBooks);
    console.log(matchedBooks);
  }
  return (
    <>
      <Head>
        <title>Book Quest</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledHeading>Book Quest</StyledHeading>
      <StyledForm onSubmit={() => getBooks(event)}>
        <label htmlFor="searchTerm">Search for a book title or author</label>
        <input
          id="searchTerm"
          name="searchTerm"
          placeholder="e.g. Harry Potter"
        />
        <button type="submit" aria-label="submit your search">
          search
        </button>
      </StyledForm>
      {searchedBooks.docs?.map((book) => (
        <SearchResult key={book.key}>
          <p>author: {book.author_name}</p>
          <h4>title: {book.title}</h4>
        </SearchResult>
      ))}
    </>
  );
}

const SearchResult = styled.article`
  border: 2px solid var(--darkmagenta);
  border-radius: 5px;
  margin: 0.5rem;
  padding: 0.25rem;
  background-color: var(--lightgrey);
`;

const StyledForm = styled.form`
  border: 2px solid var(--lightgrey);
  border-radius: 5px;
  margin: 0.5rem;
  padding: 0.5rem 0.25rem;
  background-color: var(--darkmagenta);
  color: white;
  font-weight: bold;

  input {
    padding: 0.25rem;
    height: 4vh;
    width: 77%;
  }

  button {
    padding: 0.25rem;
    margin: 0.5rem;
    height: 4vh;
    background-color: var(--darkgrey);
    color: white;
    border-radius: 5px;
  }
`;

const StyledHeading = styled.header`
  background-color: var(--darkgrey);
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
