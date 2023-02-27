import { useState } from "react";
import Head from "next/head";
import GlobalStyles from "@/components/GlobalStyles";
import store from "../redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Book Quest</title>
      </Head>

      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}
