export default async function getDescription(key, handleSetDescription) {
  try {
    const response = await fetch(`https://openlibrary.org/works/${key}.json`);
    const matchedBook = await response.json();
    const currentDescription = matchedBook.description;
    handleSetDescription(currentDescription);
  } catch (error) {
    console.error(error);
  }
}
