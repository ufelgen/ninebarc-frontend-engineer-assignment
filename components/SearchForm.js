import { useDispatch } from "react-redux";
import { toggleSearching } from "../redux/searchingSlice";
import { setCurrentSearchTerm } from "../redux/currentSearchTermSlice";
import { setSearchedBooks } from "../redux/searchedBooksSlice";
import styled from "styled-components";
import fetchSearchResults from "../helpers/fetchSearchResults";

export default function SearchForm({ onDetermineSpecification }) {
  const dispatch = useDispatch();

  function toggleSearchingState() {
    dispatch(toggleSearching());
    setTimeout(() => {
      dispatch(toggleSearching());
    }, "5000");
  }

  async function getBooks(event) {
    event.preventDefault();
    const searchTermString = event.target.elements.searchTerm.value.trim();
    const searchTermPlus = searchTermString.replace(/\s/g, "+");
    const specification = event.target.elements.specification.value;

    const searchTerm = onDetermineSpecification(specification, searchTermPlus);
    const matchedBooks = await fetchSearchResults(searchTerm, "1");
    dispatch(setSearchedBooks(matchedBooks));
    dispatch(setCurrentSearchTerm([searchTermString, specification]));
    toggleSearchingState();
    event.target.reset();
  }
  return (
    <StyledForm onSubmit={() => getBooks(event)}>
      <label htmlFor="searchTerm">Search for a book title or author</label>
      <InputField
        id="searchTerm"
        name="searchTerm"
        placeholder="e.g. Harry Potter"
      />
      <button type="submit" aria-label="submit your search">
        search
      </button>
      <input type="radio" value="author" id="author" name="specification" />
      <RadioLabel htmlFor="author">author</RadioLabel>
      <input type="radio" value="title" id="title" name="specification" />
      <RadioLabel htmlFor="none">title</RadioLabel>
      <input type="radio" value="none" id="none" name="specification" />
      <RadioLabel htmlFor="none">any</RadioLabel>
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

  /*   input {
    padding: 0.25rem;
    height: 4vh;
    width: 77%;
  } */

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

const InputField = styled.input`
  padding: 0.25rem;
  height: 4vh;
  width: 77%;
`;

const RadioLabel = styled.label`
  margin-right: 1rem;
  margin-left: 0.5rem;
`;
