import type { NextPage } from "next";
import Head from "next/head";
import styles from "./index.module.css";
import Link from 'next/link'
import { getAllCalculatorPaths } from "../lib/config";

const Home: NextPage = () => {
  const paths = getAllCalculatorPaths()
  const hrefs = paths.map(path => `./${path.params.id}`)
  const title = "Runner's caclulator"
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Runner's caclulator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{title}</h1>

        <p>
          Convert freely between pace as minutes per kilometer or mile and speed in kilometers per hour or miles per hour. You
          can also find pace and speed for the time used on any given distance or lap. 
        </p>
        {hrefs.map(href => <div key={href}><Link href={href}>{href}</Link></div>)}
        
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );
};

export default Home;
