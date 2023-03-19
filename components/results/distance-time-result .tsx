import { useContext } from "react";
import {
  ResultProps,
  toDistanceTime,
  toMinutesPerKm,
} from "../../lib/conversion";
import resultStyles from "./result.module.css";
import utilityStyles from "../../styles/utility.module.css";
import withLeadZeroes from "../../lib/with-lead-zeroes";
import styles from "./result.module.css";
import { CurrentValues } from "../../context/current-values";

export const DistanceTimeResult = ({ canonicalKph }: ResultProps) => {
  const { resultDistance, setResultDistance } = useContext(CurrentValues);
  const onDistanceChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const distance = event.currentTarget.valueAsNumber;
    setResultDistance(distance);
  };
  const distanceTime = toDistanceTime(canonicalKph, resultDistance);

  return (
    <div className={`${utilityStyles.verticalAlign} ${resultStyles.result}`}>
      <div className={styles.distanceinputbox}>
        <label className={styles.timelabel} htmlFor="distance">
          meters
        </label>
        <input
          id="distance"
          className={styles.distanceinput}
          type="number"
          onChange={onDistanceChange}
          value={resultDistance || ""}
        />{" "}
      </div>
      {distanceTime && <div className={styles.distancetimebox}>
        <span>{withLeadZeroes(distanceTime.min)}</span>:
        <span>{withLeadZeroes(distanceTime.sec)} </span>
      </div>}
    </div>
  );
};
