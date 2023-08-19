import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout/layout";
import Context from "../context/current-values";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    console.log("hola use effect")
    const handleRouteChange = (url: string) => {
      console.log("hola handle route change ", url)
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID as string, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Context>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context>
  );
}
export default MyApp;
