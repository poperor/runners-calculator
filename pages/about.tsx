import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./about.module.css";

const About: NextPage = () => {
  const heading = "About Runner's Calculator";
  const title = `About - Runner's Calculator`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="About Runner's caclulator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.about}>
        <h1 className={styles.header1}>{heading}</h1>

        <p className={styles.paragraph}>
          Runner's Calculator is a free tool for runners to find out what a given pace,
          speed, and time might be in another unit of measurement - e.g you can see what
          pace in kilometers per hour is in pace per mile.
        </p>
        <p className={styles.paragraph}>
          The different units of measurement are:
        </p>
        <ul className={styles.unitlist}>
            <li>kilometers per hour</li>
            <li>miles per hour</li>
            <li>pace per kilometer</li>
            <li>pace per mile</li>
            <li>distance time</li>
          </ul>
        <p className={styles.paragraph}>
          Feedback and suggestions are welcome.
          Please send them to <a className={styles.aboutlink} href="mailto:runners-calculator@protonmail.com">runners-calculator@protonmail.com</a>
        </p>
        <p className={styles.paragraph}>
          Runner's Calculator is open source and the code is available on <a className={styles.aboutlink} href="https://github.com/poperor/runners-calculator">GitHub</a>.
        </p>
      </div>

    </>
  );
};

export default About;
