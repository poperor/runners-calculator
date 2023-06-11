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
    hrs: null,
    min: null,
    sec: null,
    distance: inputDistance,
  };
  const [distanceTime, setDistanceTime] =
    useState<DistanceTime>(currentDistanceTime);

  if (
    distanceTime == null ||
    (currentDistanceTime.hrs !== distanceTime.hrs &&
      currentDistanceTime.min !== distanceTime.min &&
      currentDistanceTime.sec !== distanceTime.sec &&
      currentDistanceTime.distance !== distanceTime.distance)
  ) {
    setDistanceTime(currentDistanceTime);
  }

  const onDistanceChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const validatedInput = event.currentTarget.value.replace(/[^0-9]/g, "");
    const receivedDistance = Number.parseInt(validatedInput);
    const distance = receivedDistance || null;
    const newDistanceTime = { ...distanceTime, distance };
    setDistanceTime(newDistanceTime);
    setInputDistance(distance);
    setCanonicalKph(fromDistanceTime(newDistanceTime));
  };

  const onMinChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const receivedMin = event.currentTarget.valueAsNumber;
    const min = receivedMin || null;
    const newDistanceTime = { ...distanceTime, min };
    setDistanceTime(newDistanceTime);
    setCanonicalKph(fromDistanceTime(newDistanceTime));
  };

  const onSecChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const receivedSec = event.currentTarget.valueAsNumber;
    const sec = receivedSec || null;
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
          value={displayInputValue(distanceTime?.distance)}
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
          value={displayInputValue(distanceTime?.min)}
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
          value={displayInputValue(distanceTime?.sec)}
        />
      </div>
    </div>
  );
};
