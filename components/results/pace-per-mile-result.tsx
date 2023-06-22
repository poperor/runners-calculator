import { ResultProps, toPacePerMile } from "../../lib/conversion";
import resultStyles from "./result.module.css";
import utilityStyles from '../../styles/utility.module.css'
import withLeadZeroes from "../../lib/with-lead-zeroes";

export const PacePerMileResult = ({ canonicalKph }: ResultProps) => {
  const PacePerMile = toPacePerMile(canonicalKph);
  return (
    <div>
      {PacePerMile && (
        <div className={`${utilityStyles.verticalAlign} ${resultStyles.result}`}>
          <span>{withLeadZeroes(Number(PacePerMile.min))}</span>:
          <span>{withLeadZeroes(Number(PacePerMile.sec))} </span>
        </div>
      )}
    </div>
  );
};
