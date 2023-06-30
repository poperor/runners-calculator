import { useState, useContext, KeyboardEvent } from "react";
import {
  DistanceTime,
  toDistanceTime,
  fromDistanceTime,
} from "../../lib/conversion";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { CurrentValues } from "../../context/current-values";

export const DistanceTimeInput = () => {
  const { canonicalKph, setCanonicalKph, inputDistance, setInputDistance } =
    useContext(CurrentValues);
    console.log("inputDistance", inputDistance)
  const currentDistanceTime = toDistanceTime(canonicalKph, inputDistance) || {
    hrs: null,
    min: null,
    sec: null,
    distance: inputDistance ? inputDistance.toString() : null,
  };
  console.log("currentDistanceTime", currentDistanceTime)
  const [distanceTime, setDistanceTime] =
    useState<DistanceTime>(currentDistanceTime);
  console.log("distanceTime", distanceTime);
  if (
    distanceTime == null ||
    (currentDistanceTime.hrs !== distanceTime.hrs ||
      currentDistanceTime.min !== distanceTime.min ||
      currentDistanceTime.sec !== distanceTime.sec ||
      currentDistanceTime.distance !== distanceTime.distance)
  ) {
    setDistanceTime(currentDistanceTime);
  }

  const onDistanceChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const distance = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newDistanceTime = { ...distanceTime, distance };
    setDistanceTime(newDistanceTime);
    setInputDistance(Number(distance));
    setCanonicalKph(fromDistanceTime(newDistanceTime));
  };

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.value.replace(/[^0-9]/g, "");
    const newDistanceTime = { ...distanceTime, min };
    setDistanceTime(newDistanceTime);
    setCanonicalKph(fromDistanceTime(newDistanceTime));
  };
  
  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const sec = event.currentTarget.value.replace(/[^.0-9]/g, "");
    const newDistanceTime = { ...distanceTime, sec };
    setDistanceTime(newDistanceTime);
    setCanonicalKph(fromDistanceTime(newDistanceTime));
  };

  const leaveFieldOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className={utilityStyles.verticalAlign}>
      <div className={styles.timeinputbox}>
        <label className={styles.timelabel} htmlFor="distance">
          meters
        </label>
        <input
          id="distance"
          className={styles.distanceinput}
          type="text"
          onChange={onDistanceChange}
          value={distanceTime?.distance || ""}
        />{" "}
      </div>
      <div className={styles.timeinputbox}>
        <label className={styles.timelabel} htmlFor="minutes">
          min
        </label>
        <input
          id="minutes"
          className={styles.timeinput}
          type="text"
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
          onChange={onSecChange}
          onKeyDown={leaveFieldOnEnter}
          value={distanceTime?.sec || ""}
        />
      </div>
    </div>
  );
};
