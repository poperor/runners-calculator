import { useState, useContext, KeyboardEvent } from "react";
import {
  fromMinutesPerMile,
  MinutesPerMile,
  toMinutesPerMile,
} from "../../lib/conversion";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { CurrentValues } from "../../context/current-values";
import displayInputValue from "../../lib/display-input-value"

export const MinutesPerMileInput = () => {
  const { canonicalKph, setCanonicalKph } = useContext(CurrentValues);
  const [minutesPerMile, setMinutesPerMile] = useState<MinutesPerMile>(
    toMinutesPerMile(canonicalKph) || { min: null, sec: null }
  );

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.value !== "" ? event.currentTarget.valueAsNumber : null;
    const newMinPerMile = { ...minutesPerMile, min };
    setMinutesPerMile(newMinPerMile);
    setCanonicalKph(fromMinutesPerMile(newMinPerMile));
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    console.log("hola onSecChange mile", event.currentTarget.value)
    const sec = event.currentTarget.value !== "" ? event.currentTarget.valueAsNumber : null;
    const newMinPerMile = { ...minutesPerMile, sec };
    setMinutesPerMile(newMinPerMile);
    setCanonicalKph(fromMinutesPerMile(newMinPerMile));
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
          type="number"
          onChange={onMinChange}
          value={displayInputValue(minutesPerMile.min)}
        />{" "}
      </div>
      <div className={styles.timeinputbox}>
        <label className={styles.timelabel} htmlFor="seconds">
          sec
        </label>
        <input
          id="seconds"
          className={styles.timeinput}
          type="number"
          onChange={onSecChange}
          onKeyDown={leaveFieldOnEnter}
          value={displayInputValue(minutesPerMile.sec)}
        />
      </div>
    </div>
  );
};
