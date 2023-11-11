import type { NextPage } from "next";
import Head from "next/head";
import { SpeedtypesRadiogroup } from "../components/speedypes-radiogroup/speedypes-radiogroup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";

const Home: NextPage = () => {
  const heading = "Convert between pace and speed";
  const title = `${heading} - Runner's Calculator`;
  const [selectedFromSpeedTypeId, setSelectedFromSpeedTypeId] =
    useState<string>("");
  const [selectedToSpeedTypeId, setSelectedToSpeedTypeId] =
    useState<string>("");
  const router = useRouter();
  useEffect(() => {
    if (selectedFromSpeedTypeId && selectedToSpeedTypeId) {
      const path = `${selectedFromSpeedTypeId}-to-${selectedToSpeedTypeId}`;
      router.push(path);
    }
  }, [selectedFromSpeedTypeId, selectedToSpeedTypeId]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="A calculator for runners. Convert between different types of running pace and speed"
        />
        <meta name="keywords" content={`pace, speed, convert, running, runners, runner, calculator`}/>
      </Head>

      <div>
        <h1 className={styles.header1}>{heading}</h1>
        <h2 className={styles.header2}>From:</h2>
        <SpeedtypesRadiogroup
          selectedSpeedTypeId={selectedFromSpeedTypeId}
          disabledInputId={
            selectedToSpeedTypeId !== "distance-time"
              ? selectedToSpeedTypeId
              : ""
          }
          setSelectedSpeedTypeId={setSelectedFromSpeedTypeId}
          role="from"
          />
        <h2 className={styles.header2}>To:</h2>
        <SpeedtypesRadiogroup
          selectedSpeedTypeId={selectedToSpeedTypeId}
          disabledInputId={
            selectedFromSpeedTypeId !== "distance-time"
              ? selectedFromSpeedTypeId
              : ""
          }
          setSelectedSpeedTypeId={setSelectedToSpeedTypeId}
          role="to"
        />
      </div>
    </>
  );
};

export default Home;
