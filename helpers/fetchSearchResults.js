export default async function fetchSearchResults(searchTerm, page) {
  try {
    const response = await fetch(
      "https://openlibrary.org/search.json?" + searchTerm + "&page=" + page
    );
    const matchedBooks = await response.json();
    return matchedBooks;
  } catch (error) {
    console.error(error);
  }
}
