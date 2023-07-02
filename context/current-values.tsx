// Se: https://episyche.com/blog/how-to-use-context-api-in-a-nextjs-app
// TS: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

import { createContext, useState, Dispatch, SetStateAction } from "react";
import { PacePerKm, PacePerMile, fromKph, fromMph, fromPacePerKm, fromPacePerMile, toKph, toMph, toPacePerKm, toPacePerMile } from "../lib/conversion";

type Context = {
  canonicalKph: number;
  setCanonicalKph: Dispatch<SetStateAction<number>>;
  inputDistance: number | null;
  setInputDistance: Dispatch<SetStateAction<number | null>>;
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

  const changedPacePerMile = (pacePerMile: PacePerMile) => {
    setPacePerMile(pacePerMile);
    const newCanonicalKph = fromPacePerMile(pacePerMile);
    setCanonicalKph(newCanonicalKph);
    setPacePerKm(toPacePerKm(newCanonicalKph));
    setKph(toKph(newCanonicalKph));
  }

  const changedPacePerKm = (pacePerKm: PacePerKm) => {
    setPacePerKm(pacePerKm);
    const newCanonicalKph = fromPacePerKm(pacePerKm);
    setCanonicalKph(newCanonicalKph);
    setPacePerMile(toPacePerMile(newCanonicalKph));
    setKph(toKph(newCanonicalKph));
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

  return (
    <CurrentValues.Provider
      value={{
        canonicalKph,
        setCanonicalKph,
        inputDistance,
        setInputDistance,
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
      }}
    >
      {children}
    </CurrentValues.Provider>
  );
}

export default Context;
