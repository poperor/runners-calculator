import Head from "next/head";

import { Header } from "../header/header";
import styles from "./layout.module.css";

const siteTitle = "Runner's caclulator";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title = siteTitle }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Conversion between different ways of expressing speed"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="og:title" content={title} />
      </Head>

      <div className={styles.container}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};
