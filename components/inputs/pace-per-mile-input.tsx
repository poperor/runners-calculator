import { useState, useContext, KeyboardEvent } from "react";
import {
  fromPacePerMile,
  PacePerMile,
  toPacePerMile,
} from "../../lib/conversion";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { CurrentValues } from "../../context/current-values";
import displayInputValue from "../../lib/display-input-value"

export const PacePerMileInput = () => {
  const { canonicalKph, setCanonicalKph } = useContext(CurrentValues);
  const currentPacePerMile = toPacePerMile(canonicalKph) || { min: null, sec: null }
  const [PacePerMile, setPacePerMile] = useState<PacePerMile>(currentPacePerMile);
  if (PacePerMile === null || (currentPacePerMile.min !== PacePerMile.min && currentPacePerMile.sec !== PacePerMile.sec)) {
    setPacePerMile(currentPacePerMile);
  }

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newMinPerMile = { ...PacePerMile, min };
    setPacePerMile(newMinPerMile);
    setCanonicalKph(fromPacePerMile(newMinPerMile));
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const sec = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newMinPerMile = { ...PacePerMile, sec };
    setPacePerMile(newMinPerMile);
    setCanonicalKph(fromPacePerMile(newMinPerMile));
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
          value={PacePerMile?.min || ""}
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
          value={PacePerMile?.sec || ""}
        />
      </div>
    </div>
  );
};
