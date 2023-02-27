import { useDispatch } from "react-redux";
import { toggle } from "../redux/searchingSlice";
import { setCurrentSearchTerm } from "../redux/currentSearchTermSlice";
import { setSearchedBooks } from "../redux/searchedBooksSlice";
import styled from "styled-components";
import fetchSearchResults from "../helpers/fetchSearchResults";

export default function SearchForm() {
  const dispatch = useDispatch();

  function toggleSearching() {
    dispatch(toggle());
    setTimeout(() => {
      dispatch(toggle());
    }, "5000");
  }

  async function getBooks(event) {
    event.preventDefault();
    const searchTermString = event.target.elements.searchTerm.value;
    const searchTerm = searchTermString.replace(/\s/g, "+");
    const matchedBooks = await fetchSearchResults(searchTerm);
    dispatch(setSearchedBooks(matchedBooks));
    dispatch(setCurrentSearchTerm(searchTermString));
    toggleSearching();
    event.target.reset();
  }
  return (
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
  );
}

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
    width: 15%;
  }
`;
