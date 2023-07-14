import { ResultProps } from "../../lib/conversion";
import resultStyles from "./result.module.css";

export const KphResult = ({ canonicalKph }: ResultProps) => {
  return (
    <div className={resultStyles.result}>
      {canonicalKph > 0 && <div>{canonicalKph.toFixed(1)}</div>}
    </div>
  );
};
