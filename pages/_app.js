import Head from "next/head";
import GlobalStyles from "@/components/GlobalStyles";
import store from "../redux/store";
import { Provider } from "react-redux";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [favourites, setFavourites] = useLocalStorageState("favourites", {
    defaultValue: [],
  });

  function handleAddToFavourites(currentBook) {
    setFavourites([...favourites, currentBook]);
  }

  function handleRemoveFromFavourites(currentBook) {
    setFavourites(favourites.filter((book) => book.key !== currentBook.key));
  }
  return (
    <Provider store={store}>
      <Head>
        <title>Book Quest</title>
      </Head>

      <GlobalStyles />
      <Component
        {...pageProps}
        onAddToFavourites={handleAddToFavourites}
        onRemoveFromFavourites={handleRemoveFromFavourites}
      />
    </Provider>
  );
}
