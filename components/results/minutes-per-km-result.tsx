import { ResultProps, toMinutesPerKm } from "../../lib/conversion";
import resultStyles from "./result.module.css";
import utilityStyles from '../../styles/utility.module.css'
import withLeadZeroes from "../../lib/with-lead-zeroes";

export const MinutesPerKmResult = ({ canonicalKph }: ResultProps) => {
  const minutesPerKm = toMinutesPerKm(canonicalKph);
  return (
    <div>
      {minutesPerKm && (
        <div className={`${utilityStyles.verticalAlign} ${resultStyles.result}`}>
          <span>{withLeadZeroes(Number(minutesPerKm.min))}</span>:
          <span>{withLeadZeroes(Number(minutesPerKm.sec))} </span>
        </div>
      )}
    </div>
  );
};
