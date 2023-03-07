import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout/layout";
import Context from "../context/canonical-kph";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context>
  );
}
export default MyApp;
