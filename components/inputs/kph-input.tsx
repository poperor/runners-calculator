import { useState, useContext ,KeyboardEvent } from "react";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { toKph } from "../../lib/conversion";
import { CurrentValues } from "../../context/current-values";

export const KphInput = () => {
  const { canonicalKph, setCanonicalKph } = useContext(CurrentValues);
  const [kph, setKph] = useState(toKph(canonicalKph));

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const kph = event.currentTarget.valueAsNumber;
    setKph(kph);
    setCanonicalKph(kph);
  };

  const leaveFieldOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className={utilityStyles.verticalAlign}>
      <input
        className={styles.speedinput}
        type="number"
        value={kph || ""}
        onChange={onChange}
        onKeyDown={leaveFieldOnEnter}
      />
    </div>
  );
};
