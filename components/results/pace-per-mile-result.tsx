import { ResultProps, toPacePerMile } from "../../lib/conversion";
import resultStyles from "./result.module.css";
import utilityStyles from "../../styles/utility.module.css";
import withLeadZeroes from "../../lib/with-lead-zeroes";

export const PacePerMileResult = ({ canonicalKph }: ResultProps) => {
  const pacePerMile = toPacePerMile(canonicalKph);
  return (
    <div>
      {pacePerMile && (
        <div
          className={`${utilityStyles.verticalAlign} ${resultStyles.result}`}
        >
          {Number(pacePerMile.min) > 0 && (
            <span>{withLeadZeroes(Number(pacePerMile.min))}:</span>
          )}
          {(Number(pacePerMile.min) > 0 || Number(pacePerMile.sec) > 0) && (
            <span>{withLeadZeroes(Number(pacePerMile.sec))} </span>
          )}
        </div>
      )}
    </div>
  );
};
