// Se: https://episyche.com/blog/how-to-use-context-api-in-a-nextjs-app
// TS: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

import { createContext, useState, Dispatch, SetStateAction } from "react";
import { DistanceTime, PacePerKm, PacePerMile, fromDistanceTime, fromKph, fromMph, fromPacePerKm, fromPacePerMile, toDistanceTime, toKph, toMph, toPacePerKm, toPacePerMile } from "../lib/conversion";

type Context = {
  canonicalKph: number;
  setCanonicalKph: Dispatch<SetStateAction<number>>;
  inputDistance: number | null;
  setInputDistance: Dispatch<SetStateAction<number | null>>;
  changedInputDistance: (inputDistance: number | null) => void;
  resultDistance: number;
  setResultDistance: Dispatch<SetStateAction<number>>;
  pacePerKm: PacePerKm;
  changedPacePerKm: (pacePerKm: PacePerKm) => void;
  pacePerMile: PacePerMile;
  changedPacePerMile: (pacePerMile: PacePerMile) => void;
  kph: string | null;
  changedKph: (kph: string | null) => void;
  mph: string | null;
  changedMph: (mph: string | null) => void;
  distanceTime: DistanceTime;
  changedDistanceTime: (distanceTime: DistanceTime) => void;
};
type Props = {
  children: React.ReactNode;
};

export const CurrentValues = createContext({} as Context);

function Context({ children }: Props) {
  const [canonicalKph, setCanonicalKph] = useState<number>(0);
  const [inputDistance, setInputDistance] = useState<number | null>(null);
  const [resultDistance, setResultDistance] = useState<number>(0);
  const [pacePerKm, setPacePerKm] = useState<PacePerKm>({ min: null, sec: null });
  const [pacePerMile, setPacePerMile] = useState<PacePerMile>({ min: null, sec: null });
  const [kph, setKph] = useState<string | null>(null);
  const [mph, setMph] = useState<string | null>(null);
  const [distanceTime, setDistanceTime] = useState<DistanceTime>({ distance: null, hrs: null, min: null, sec: null });

  const changedPacePerMile = (pacePerMile: PacePerMile) => {
    setPacePerMile(pacePerMile);
    const newCanonicalKph = fromPacePerMile(pacePerMile);
    setCanonicalKph(newCanonicalKph);
    setPacePerKm(toPacePerKm(newCanonicalKph));
    setKph(toKph(newCanonicalKph));
    setMph(toMph(newCanonicalKph));
  }

  const changedPacePerKm = (pacePerKm: PacePerKm) => {
    setPacePerKm(pacePerKm);
    const newCanonicalKph = fromPacePerKm(pacePerKm);
    setCanonicalKph(newCanonicalKph);
    setPacePerMile(toPacePerMile(newCanonicalKph));
    setKph(toKph(newCanonicalKph));
    setMph(toMph(newCanonicalKph));
  } 

  const changedKph = (kph: string | null) => {
    setKph(kph);
    const newCanonicalKph = fromKph(kph);
    setCanonicalKph(newCanonicalKph);
    setPacePerKm(toPacePerKm(newCanonicalKph));
    setPacePerMile(toPacePerMile(newCanonicalKph));
    setMph(toMph(newCanonicalKph));
  }

  const changedMph = (mph: string | null) => {
    setMph(mph);
    const newCanonicalKph = fromMph(mph);
    setCanonicalKph(newCanonicalKph);
    setPacePerKm(toPacePerKm(newCanonicalKph));
    setPacePerMile(toPacePerMile(newCanonicalKph));
    setKph(toKph(newCanonicalKph));
  }

  const changedDistanceTime = (distanceTime: DistanceTime) => {
    setDistanceTime(distanceTime);
    const newCanonicalKph = fromDistanceTime(distanceTime);
    setCanonicalKph(newCanonicalKph);
    setPacePerKm(toPacePerKm(newCanonicalKph));
    setPacePerMile(toPacePerMile(newCanonicalKph));
    setKph(toKph(newCanonicalKph));
    setMph(toMph(newCanonicalKph));
  }

  const changedInputDistance = (inputDistance: number | null) => {
    setInputDistance(inputDistance);
    const distanceTime = toDistanceTime(canonicalKph, inputDistance);
    setDistanceTime(distanceTime);
  }


  return (
    <CurrentValues.Provider
      value={{
        canonicalKph,
        setCanonicalKph,
        inputDistance,
        setInputDistance,
        changedInputDistance,
        resultDistance,
        setResultDistance,
        pacePerKm,
        changedPacePerKm,
        pacePerMile,
        changedPacePerMile,
        kph,
        changedKph,
        mph,
        changedMph,
        distanceTime,
        changedDistanceTime,
      }}
    >
      {children}
    </CurrentValues.Provider>
  );
}

export default Context;
