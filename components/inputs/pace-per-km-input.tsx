import { useState, useContext, KeyboardEvent } from "react";
import {
  fromPacePerKm,
  PacePerKm,
  toPacePerKm,
} from "../../lib/conversion";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css"
import { CurrentValues } from "../../context/current-values";
import displayInputValue from "../../lib/display-input-value"

export const PacePerKmInput = () => {
  const { canonicalKph, setCanonicalKph } = useContext(CurrentValues);
  const currentPacePerKm = toPacePerKm(canonicalKph) || { min: null, sec: null }
  const [PacePerKm, setPacePerKm] = useState<PacePerKm>(
    toPacePerKm(canonicalKph) || { min: null, sec: null }
  );
  if (PacePerKm === null || (currentPacePerKm.min !== PacePerKm.min && currentPacePerKm.sec !== PacePerKm.sec)) {
    setPacePerKm(currentPacePerKm);
  }

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newMinPerKm = { ...PacePerKm, min };
    setPacePerKm(newMinPerKm);
    setCanonicalKph(fromPacePerKm(newMinPerKm));
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const sec = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newMinPerKm = { ...PacePerKm, sec };
    setPacePerKm(newMinPerKm);
    setCanonicalKph(fromPacePerKm(newMinPerKm));
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
          value={PacePerKm?.min || ""}
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
          value={PacePerKm?.sec || ""}
        />
      </div>
    </div>
  );
};
