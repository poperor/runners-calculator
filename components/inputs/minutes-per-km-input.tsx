import { useState, useContext } from "react";
import {
  fromMinutesPerKm,
  MinutesPerKm,
  toMinutesPerKm
} from "../../lib/conversion";
import styles from './input.module.css'
import utilityStyles from '../../styles/utility.module.css'
import { CanonicalKph } from "../../context/canonical-kph";


export const MinutesPerKmInput = () => {
  const { canonicalKph, setCanonicalKph } = useContext(CanonicalKph);
  const [minutesPerKm, setMinutesPerKm] = useState<MinutesPerKm>(toMinutesPerKm(canonicalKph) || {min: 0, sec: 0});

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

  return (
    <div className={utilityStyles.verticalAlign}>
      <input className={styles.mininput} type="number" onChange={onMinChange} value={minutesPerKm.min || ''} />{" "}
      min{" "}
      <input className={styles.secinput} type="number" onChange={onSecChange} value={minutesPerKm.sec || ''} />{" "}
      sec
    </div>
  );
};