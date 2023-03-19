// Se: https://episyche.com/blog/how-to-use-context-api-in-a-nextjs-app
// TS: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

import { createContext, useState, Dispatch, SetStateAction } from "react";

type Context = {
  canonicalKph: number;
  setCanonicalKph: Dispatch<SetStateAction<number>>;
  inputDistance: number;
  setInputDistance: Dispatch<SetStateAction<number>>;
  resultDistance: number;
  setResultDistance: Dispatch<SetStateAction<number>>;
};
type Props = {
  children: React.ReactNode;
};

export const CurrentValues = createContext({} as Context);

function Context({ children }: Props) {
  const [canonicalKph, setCanonicalKph] = useState<number>(0);
  const [inputDistance, setInputDistance] = useState<number>(0);
  const [resultDistance, setResultDistance] = useState<number>(0);

  return (
    <CurrentValues.Provider
      value={{
        canonicalKph,
        setCanonicalKph,
        inputDistance,
        setInputDistance,
        resultDistance,
        setResultDistance,
      }}
    >
      {children}
    </CurrentValues.Provider>
  );
}

export default Context;
