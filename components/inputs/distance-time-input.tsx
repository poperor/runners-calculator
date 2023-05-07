import { useState, useContext, KeyboardEvent } from "react";
import {
  DistanceTime,
  toDistanceTime,
  fromDistanceTime,
} from "../../lib/conversion";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { CurrentValues } from "../../context/current-values";
import displayInputValue from "../../lib/display-input-value";

export const DistanceTimeInput = () => {
  const { canonicalKph, setCanonicalKph, inputDistance, setInputDistance } =
    useContext(CurrentValues);
  const currentDistanceTime = toDistanceTime(canonicalKph, inputDistance) || {
    min: null,
    sec: null,
    distance: inputDistance,
  };
  const [distanceTime, setDistanceTime] =
    useState<DistanceTime>(currentDistanceTime);

  if (
    currentDistanceTime.min !== distanceTime.min &&
    currentDistanceTime.sec !== distanceTime.sec &&
    currentDistanceTime.distance !== distanceTime.distance
  ) {
    setDistanceTime(currentDistanceTime);
  }  
  // If no input distance is present canonical kph is reset since it is dependent on distance here
  // if (!inputDistance) {
  //   setCanonicalKph(0);
  // }
  

  const onDistanceChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const distance = event.currentTarget.valueAsNumber;
    const newDistanceTime = { ...distanceTime, distance };
    setDistanceTime(newDistanceTime);
    setInputDistance(distance);
    setCanonicalKph(fromDistanceTime(newDistanceTime));
  };

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const min = event.currentTarget.valueAsNumber;
    const newDistanceTime = { ...distanceTime, min };
    setDistanceTime(newDistanceTime);
    setCanonicalKph(fromDistanceTime(newDistanceTime));
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const sec = event.currentTarget.valueAsNumber;
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
          type="number"
          onChange={onDistanceChange}
          value={displayInputValue(distanceTime.distance)}
        />{" "}
      </div>
      <div className={styles.timeinputbox}>
        <label className={styles.timelabel} htmlFor="minutes">
          min
        </label>
        <input
          id="minutes"
          className={styles.timeinput}
          type="number"
          onChange={onMinChange}
          value={displayInputValue(distanceTime.min)}
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
          value={displayInputValue(distanceTime.sec)}
        />
      </div>
    </div>
  );
};
