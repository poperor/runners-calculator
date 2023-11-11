import Head from "next/head";

import { Header } from "../header/header";
import styles from "./layout.module.css";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <Header />
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};
