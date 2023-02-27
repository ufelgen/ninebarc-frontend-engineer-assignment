import { useState } from "react";
import Head from "next/head";
import GlobalStyles from "@/components/GlobalStyles";

export default function App({ Component, pageProps }) {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [description, setDescription] = useState("");
  const [searching, setSearching] = useState(false);

  function handleUpdateSearchedBooks(newBooks) {
    setSearchedBooks(newBooks);
  }

  function handleUpdateCurrentSearchTerm(searchTerm) {
    setCurrentSearchTerm(searchTerm);
  }

  function handleUpdateDescription(description) {
    setDescription(description);
  }

  function handleToggleSearching() {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
    }, "5000");
  }
  return (
    <>
      <Head>
        <title>Book Quest</title>
      </Head>

      <GlobalStyles />
      <Component
        {...pageProps}
        onUpdateSearchedBooks={handleUpdateSearchedBooks}
        searchedBooks={searchedBooks}
        onUpdateCurrentSearchTerm={handleUpdateCurrentSearchTerm}
        currentSearchTerm={currentSearchTerm}
        onUpdateDescription={handleUpdateDescription}
        description={description}
        toggleSearching={handleToggleSearching}
        searching={searching}
      />
    </>
  );
}
