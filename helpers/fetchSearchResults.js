export default async function fetchSearchResults(searchTerm) {
  try {
    const response = await fetch(
      "https://openlibrary.org/search.json?q=" + searchTerm
    );
    const matchedBooks = await response.json();
    return matchedBooks;
  } catch (error) {
    console.error(error);
  }
}
