import { ResultProps, toMinutesPerMile } from "../../lib/conversion";
import resultStyles from "./result.module.css";
import utilityStyles from '../../styles/utility.module.css'
import withLeadZeroes from "../../lib/with-lead-zeroes";

export const MinutesPerMileResult = ({ canonicalKph }: ResultProps) => {
  const minutesPerMile = toMinutesPerMile(canonicalKph);
  return (
    <div>
      {minutesPerMile && (
        <div className={`${utilityStyles.verticalAlign} ${resultStyles.result}`}>
          <span>{withLeadZeroes(minutesPerMile.min)}</span>:
          <span>{withLeadZeroes(minutesPerMile.sec)} </span>
        </div>
      )}
    </div>
  );
};
