import { ResultProps, toPacePerKm } from "../../lib/conversion";
import resultStyles from "./result.module.css";
import withLeadZeroes from "../../lib/with-lead-zeroes";

export const PacePerKmResult = ({ canonicalKph }: ResultProps) => {
  const pacePerKm = toPacePerKm(canonicalKph);
  return (
    <div>
      {pacePerKm && (
        <div className={resultStyles.result}>
          {Number(pacePerKm.min) > 0 && (
            <span>{withLeadZeroes(Number(pacePerKm.min))}:</span>
          )}
          {(Number(pacePerKm.min) > 0 || Number(pacePerKm.sec) > 0) && (
            <span>{withLeadZeroes(Number(pacePerKm.sec))}</span>
          )}
        </div>
      )}
    </div>
  );
};
