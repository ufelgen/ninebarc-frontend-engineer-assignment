import { Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoFavourites from "@/components/NoFavourites";
import BookSearchResult from "@/components/BookSearchResult";
import useLocalStorageState from "use-local-storage-state";

export default function Favourites() {
  const [favourites] = useLocalStorageState("favourites");
  return (
    <>
      <Header />
      {favourites?.[0] ? (
        <>
          {favourites?.map((book) => (
            <Fragment key={book.key}>
              <BookSearchResult book={book} />
            </Fragment>
          ))}
        </>
      ) : (
        <NoFavourites />
      )}

      <Footer />
    </>
  );
}
