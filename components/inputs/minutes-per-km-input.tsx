import { useState, useContext, KeyboardEvent } from "react";
import {
  fromMinutesPerKm,
  MinutesPerKm,
  toMinutesPerKm,
} from "../../lib/conversion";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { CurrentValues } from "../../context/current-values";

export const MinutesPerKmInput = () => {
  const { canonicalKph, setCanonicalKph } = useContext(CurrentValues);
  const [minutesPerKm, setMinutesPerKm] = useState<MinutesPerKm>(
    toMinutesPerKm(canonicalKph) || { min: 0, sec: 0 }
  );

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.valueAsNumber;
    const newMinPerKm = { ...minutesPerKm, min };
    setMinutesPerKm(newMinPerKm);
    setCanonicalKph(fromMinutesPerKm(newMinPerKm));
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const sec = event.currentTarget.valueAsNumber;
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
          value={minutesPerKm.min || ""}
        />{" "}
      </div>
      <div className={styles.secinputbox}>
        <label className={styles.timelabel} htmlFor="seconds">
          sec
        </label>
        <input
          id="seconds"
          className={styles.timeinput}
          type="number"
          onChange={onSecChange}
          onKeyDown={leaveFieldOnEnter}
          value={minutesPerKm.sec || ""}
        />
      </div>
    </div>
  );
};
