import { ResultProps, toMph } from "../../lib/conversion";
import resultStyles from "./result.module.css";

export const MphResult = ({ canonicalKph }: ResultProps) => {
  const mph = toMph(canonicalKph);
  return (
    <div className={resultStyles.result}>
      {Number(mph) > 0 && <div>{Number(mph).toFixed(1)}</div>}
    </div>
  );
};
