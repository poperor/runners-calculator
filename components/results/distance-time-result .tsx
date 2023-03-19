import { ResultProps, toMinutesPerKm } from "../../lib/conversion";
import resultStyles from "./result.module.css";
import utilityStyles from '../../styles/utility.module.css'
import withLeadZeroes from "../../lib/with-lead-zeroes";

export const DistanceTimeResult = ({ canonicalKph }: ResultProps) => {
  const minutesPerKm = toMinutesPerKm(canonicalKph);
  return (
    <div>
      {minutesPerKm && (
        <div className={`${utilityStyles.verticalAlign} ${resultStyles.result}`}>
          <span>{withLeadZeroes(minutesPerKm.min)}</span>:
          <span>{withLeadZeroes(minutesPerKm.sec)} </span>
        </div>
      )}
    </div>
  );
};
