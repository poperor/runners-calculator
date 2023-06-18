import { useState, useContext, KeyboardEvent } from "react";
import {
  fromMinutesPerKm,
  MinutesPerKm,
  toMinutesPerKm,
} from "../../lib/conversion";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css"
import { CurrentValues } from "../../context/current-values";
import displayInputValue from "../../lib/display-input-value"

export const MinutesPerKmInput = () => {
  const { canonicalKph, setCanonicalKph } = useContext(CurrentValues);
  const currentMinutesPerKm = toMinutesPerKm(canonicalKph) || { min: null, sec: null }
  const [minutesPerKm, setMinutesPerKm] = useState<MinutesPerKm>(
    toMinutesPerKm(canonicalKph) || { min: null, sec: null }
  );
  if (minutesPerKm === null || (currentMinutesPerKm.min !== minutesPerKm.min && currentMinutesPerKm.sec !== minutesPerKm.sec)) {
    setMinutesPerKm(currentMinutesPerKm);
  }

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newMinPerKm = { ...minutesPerKm, min };
    setMinutesPerKm(newMinPerKm);
    setCanonicalKph(fromMinutesPerKm(newMinPerKm));
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const sec = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newMinPerKm = { ...minutesPerKm, sec };
    setMinutesPerKm(newMinPerKm);
    setCanonicalKph(fromMinutesPerKm(newMinPerKm));
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
          value={minutesPerKm?.min || ""}
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
          value={minutesPerKm?.sec || ""}
        />
      </div>
    </div>
  );
};
