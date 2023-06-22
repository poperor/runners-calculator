import { ResultProps, toPacePerKm } from "../../lib/conversion";
import resultStyles from "./result.module.css";
import utilityStyles from '../../styles/utility.module.css'
import withLeadZeroes from "../../lib/with-lead-zeroes";

export const PacePerKmResult = ({ canonicalKph }: ResultProps) => {
  const PacePerKm = toPacePerKm(canonicalKph);
  return (
    <div>
      {PacePerKm && (
        <div className={`${utilityStyles.verticalAlign} ${resultStyles.result}`}>
          <span>{withLeadZeroes(Number(PacePerKm.min))}</span>:
          <span>{withLeadZeroes(Number(PacePerKm.sec))}</span>
        </div>
      )}
    </div>
  );
};
