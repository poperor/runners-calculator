import { useState, useContext, KeyboardEvent } from "react";
import {
  fromPacePerMile,
  PacePerMile,
  toPacePerMile,
} from "../../lib/conversion";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { CurrentValues } from "../../context/current-values";

export const PacePerMileInput = () => {
  const { canonicalKph, setCanonicalKph, setInputDistance } = useContext(CurrentValues);
  const currentPacePerMile = toPacePerMile(canonicalKph) || { min: null, sec: null }
  const [pacePerMile, setPacePerMile] = useState<PacePerMile>(currentPacePerMile);
  if (
    pacePerMile === null ||
    currentPacePerMile.min !== pacePerMile.min ||
    currentPacePerMile.sec !== pacePerMile.sec
  ) {
    setPacePerMile(currentPacePerMile);
  }

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newPacePerMile = { ...pacePerMile, min };
    setPacePerMile(newPacePerMile);
    setCanonicalKph(fromPacePerMile(newPacePerMile));
    setInputDistance(1603);
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const sec = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newPacePerMile = { ...pacePerMile, sec };
    setPacePerMile(newPacePerMile);
    setCanonicalKph(fromPacePerMile(newPacePerMile));
    setInputDistance(1603);
  };

  const leaveFieldOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  };

  return (
    <div className={utilityStyles.verticalAlign}>
      <div className={styles.timeinputbox}>
        <label className={styles.timelabel} htmlFor="minutes">
          min
        </label>
        <input
          id="minutes"
          className={styles.timeinput}
          type="text"
          onChange={onMinChange}
          value={pacePerMile?.min || ""}
        />{" "}
      </div>
      <div className={styles.timeinputbox}>
        <label className={styles.timelabel} htmlFor="seconds">
          sec
        </label>
        <input
          id="seconds"
          className={styles.timeinput}
          type="text"
          onChange={onSecChange}
          onKeyDown={leaveFieldOnEnter}
          value={pacePerMile?.sec || ""}
        />
      </div>
    </div>
  );
};
