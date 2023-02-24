import { useState } from "react";
import Head from "next/head";
import GlobalStyles from "@/components/GlobalStyles";

export default function App({ Component, pageProps }) {
  const [searchedBooks, setSearchedBooks] = useState([]);

  function handleUpdateSearchedBooks(newBooks) {
    setSearchedBooks(newBooks);
  }
  return (
    <>
      <Head>
        <title>flashcards extreme</title>
      </Head>

      <GlobalStyles />
      <Component
        {...pageProps}
        onUpdateSearchedBooks={handleUpdateSearchedBooks}
        searchedBooks={searchedBooks}
      />
    </>
  );
}
