import { useContext, KeyboardEvent } from "react";
import styles from "./input.module.css";
import { CurrentValues } from "../../context/current-values";

export const PacePerKmInput = () => {
  const { pacePerKm, changedPacePerKm } = useContext(CurrentValues);
  
  
  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newPacePerKm = { ...pacePerKm, min };
    changedPacePerKm(newPacePerKm);
  };
  
  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const sec = event.currentTarget.value.replace(/[^.0-9]/g, "");
    const newPacePerKm = { ...pacePerKm, sec };
    changedPacePerKm(newPacePerKm);
  };

  const leaveFieldOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  };

  return (
    <div>
      <div className={styles.timeinputbox}>
        <label className={styles.timelabel} htmlFor="minutes">
          min
        </label>
        <input
          id="minutes"
          className={styles.timeinput}
          type="text"
          inputMode="numeric"
          onChange={onMinChange}
          value={pacePerKm?.min || ""}
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
          inputMode="numeric"
          onChange={onSecChange}
          onKeyDown={leaveFieldOnEnter}
          value={pacePerKm?.sec || ""}
        />
      </div>
    </div>
  );
};
