import { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { getAllCalculatorPaths, Params, SpeedType, speedTypes } from "../lib/config";
import styles from "./[id].module.css";
import { upperCaseFirst } from "upper-case-first";
import { CurrentValues } from "../context/current-values";
import Image from "next/image";
import switcharrows from "../public/switch-vertical_2.svg";
import Link from "next/link";
import { AlternativeButtons } from "../components/alternatives-buttons/alternative-buttons";

interface Props {
  id: string;
}

const Conversion: NextPage<Props> = ({ id }) => {
  const {
    canonicalKph,
    inputDistance,
    setInputDistance,
    resultDistance,
    setResultDistance,
  } = useContext(CurrentValues);
  const [inputTypeId, resultTypeId] = id.split("-to-");
  const inputType = speedTypes.find(
    (speedType) => speedType.id === inputTypeId
  );
  const resultType = speedTypes.find(
    (speedType) => speedType.id === resultTypeId
  );

  const adjustDistances = () => {
    if (inputTypeId === "distance-time" && inputDistance !== null) {
      setResultDistance(inputDistance);
    }
    if (resultTypeId === "distance-time" && resultDistance !== null) {
      setInputDistance(resultDistance);
    }
  };

  const getAltSpeedTypes = (thisSpeedType: SpeedType) => {
    return speedTypes.filter(
      (speedType) =>
        (speedType.id !== inputTypeId && speedType.id !== resultTypeId) ||
        (speedType.id !== thisSpeedType.id && speedType.id === "distance-time")
    );
  };

  if (!inputType || !resultType) {
    return <p>Error</p>;
  }
  const title = upperCaseFirst(`${inputType.name} to ${resultType.name}`);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
      </Head>
      <div>
        <h1 className={styles.convHeader}>{title}</h1>
        <div className={styles.inputContainer}>
          <div className={styles.inputComponent}>
            <fieldset className={styles.inputFieldset}>
              <legend className={styles.boxLegend}>
                {upperCaseFirst(inputType.name)}
              </legend>
              {inputType.inputComponent()}
            </fieldset>
          </div>
          <AlternativeButtons resultSpeedType={resultType} speedTypes={getAltSpeedTypes(inputType)} />
        </div>

        <div className={styles.switchContainer}>
          <Link
            className={styles.switchLink}
            href={`${resultTypeId}-to-${inputTypeId}`}
          >
            <Image
              priority
              src={switcharrows}
              height={64}
              width={64}
              alt="Switch direction of calculation"
              onClick={adjustDistances}
            />
          </Link>
        </div>
        <div className={styles.resultContainer}>
          <div className={styles.resultComponent}>
            <fieldset className={styles.resultFieldset}>
              <legend className={styles.boxLegend}>
                {" "}
                {upperCaseFirst(resultType.name)}
              </legend>
              {resultType.resultComponent({ canonicalKph })}
            </fieldset>
          </div>
          <AlternativeButtons inputSpeedType={inputType} speedTypes={getAltSpeedTypes(resultType)} />
        </div>
      </div>
    </>
  );
};

// getStaticPaths pre-render all the paths for the various calculator pages. getStaticPaths will only run
// during build in production. In development (next dev), getStaticPaths will be called on every request.
export async function getStaticPaths() {
  const paths = getAllCalculatorPaths();
  return {
    paths,
    fallback: false,
  };
}

// getStaticProps returns the path (id) for the pre-rendered page (see getStaticPaths)
export async function getStaticProps({ params }: Params) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default Conversion;
