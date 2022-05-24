import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CtxProvider } from "../store/ctxProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CtxProvider>
      <Component {...pageProps} />
    </CtxProvider>
  );
}

export default MyApp;
