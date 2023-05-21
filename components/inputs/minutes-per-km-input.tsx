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
    const receivedMin = event.currentTarget.valueAsNumber;
    const min = receivedMin || null;
    const newMinPerKm = { ...minutesPerKm, min };
    setMinutesPerKm(newMinPerKm);
    setCanonicalKph(fromMinutesPerKm(newMinPerKm));
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const receivedSec = event.currentTarget.valueAsNumber;
    const sec = receivedSec || null;
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
          type="number"
          onChange={onMinChange}
          value={displayInputValue(minutesPerKm?.min)}
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
          value={displayInputValue(minutesPerKm?.sec)}
        />
      </div>
    </div>
  );
};
