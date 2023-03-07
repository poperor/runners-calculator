// Se: https://episyche.com/blog/how-to-use-context-api-in-a-nextjs-app
// TS: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
 
import { createContext, useState, Dispatch, SetStateAction} from "react";

type Context = {
  canonicalKph: number;
  setCanonicalKph: Dispatch<SetStateAction<number>>
};
type Props = {
  children: React.ReactNode;
};

export const CanonicalKph = createContext({} as Context);

function Context({ children }: Props) {
  const [canonicalKph, setCanonicalKph] = useState<number>(0);

  return (
    <CanonicalKph.Provider value = {{canonicalKph, setCanonicalKph}}>
      {children}
    </CanonicalKph.Provider>
  );
}

export default Context;
