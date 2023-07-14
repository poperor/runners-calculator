import { useContext, KeyboardEvent } from "react";
import styles from "./input.module.css";
import { CurrentValues } from "../../context/current-values";

export const DistanceTimeInput = () => {
  const { distanceTime, changedDistanceTime, setInputDistance } =
    useContext(CurrentValues);

  const onDistanceChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const distance = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newDistanceTime = { ...distanceTime, distance };
    changedDistanceTime(newDistanceTime);
    setInputDistance(Number(distance));
  };

  const onHrsChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const hrs = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newDistanceTime = { ...distanceTime, hrs };
    changedDistanceTime(newDistanceTime);
  };

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newDistanceTime = { ...distanceTime, min };
    changedDistanceTime(newDistanceTime);
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const sec = event.currentTarget.value.replace(/[^.0-9]/g, "");
    const newDistanceTime = { ...distanceTime, sec };
    changedDistanceTime(newDistanceTime);
  };

  const leaveFieldOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div>
      <div className={styles.distanceinputbox}>
        <label className={styles.timelabel} htmlFor="distance">
          meters
        </label>
        <input
          id="distance"
          className={styles.distanceinput}
          type="text"
          inputMode="numeric"
          onChange={onDistanceChange}
          value={distanceTime?.distance || ""}
        />{" "}
      </div>
      {(Number(distanceTime.hrs) > 0 ||
        Number(distanceTime.distance) > 10000) && (
        <div className={styles.timeinputbox}>
          <label className={styles.timelabel} htmlFor="hrs">
            hrs
          </label>
          <input
            id="hrs"
            className={styles.timeinput}
            type="text"
            inputMode="numeric"
            onChange={onHrsChange}
            value={distanceTime?.hrs || ""}
          />{" "}
        </div>
      )}
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
          value={distanceTime?.min || ""}
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
          value={distanceTime?.sec || ""}
        />
      </div>
    </div>
  );
};
