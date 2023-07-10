import { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import {
  getAllCalculatorPaths,
  Params,
  SpeedType,
  speedTypes,
} from "../lib/config";
import styles from "./[id].module.css";
import { upperCaseFirst } from "upper-case-first";
import { CurrentValues } from "../context/current-values";
import Image from "next/image";
import switcharrows from "../public/switch-vertical_2.svg";
import Link from "next/link";
import { AlternativesSelect } from "../components/alternatives-select/alternatives-select";

interface Props {
  id: string;
}

const Conversion: NextPage<Props> = ({ id }) => {
  const {
    canonicalKph,
    inputDistance,
    changedInputDistance,
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

  const swapDistances = () => {
    if (inputTypeId === "distance-time" && inputDistance !== null) {
      setResultDistance(inputDistance);
    }
    if (resultTypeId === "distance-time" && resultDistance !== null) {
      changedInputDistance(resultDistance);
    }
  };

  const getAltSpeedTypes = (excludedSpeedType: SpeedType) => {
    return speedTypes.filter(
      (speedType) =>
        speedType.id !== excludedSpeedType.id ||
        excludedSpeedType.id === "distance-time"
    );
  };

  if (!inputType || !resultType) {
    return <p>Error</p>;
  }
  const title = upperCaseFirst(`${inputType.name} to ${resultType.name}`);
  const fullTitle = upperCaseFirst(`${title} - Runner's Calculator`);
  
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="og:title" content={title} />
      </Head>
      <div>
        <h1 className={styles.convHeader}>{title}</h1>
        <div className={styles.inputContainer}>
          <div className={styles.inputComponent}>
            <fieldset className={styles.inputFieldset}>
              <legend>
                <AlternativesSelect
                  inputSpeedType={inputType}
                  resultSpeedType={resultType}
                  speedTypes={getAltSpeedTypes(resultType)}
                  role="input"
                />
              </legend>
              {inputType.inputComponent()}
            </fieldset>
          </div>
        </div>

        <div className={styles.switchContainer}>
          <Link
            className={styles.switchLink}
            href={`${resultTypeId}-to-${inputTypeId}`}
          >
            <Image className={styles.switchImage}
              priority
              src={switcharrows}
              // height={64}
              // width={64}
              alt="Switch direction of calculation"
              onClick={swapDistances}
            />
          </Link>
        </div>
        <div className={styles.resultContainer}>
          <div className={styles.resultComponent}>
            <fieldset className={styles.resultFieldset}>
              <legend>
                <AlternativesSelect
                  inputSpeedType={inputType}
                  resultSpeedType={resultType}
                  speedTypes={getAltSpeedTypes(inputType)}
                  role="result"
                />
              </legend>
              {resultType.resultComponent({ canonicalKph })}
            </fieldset>
          </div>
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
