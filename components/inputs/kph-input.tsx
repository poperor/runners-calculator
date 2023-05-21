import { useState, useContext ,KeyboardEvent } from "react";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { toKph } from "../../lib/conversion";
import { CurrentValues } from "../../context/current-values";
import displayInputValue from "../../lib/display-input-value";

export const KphInput = () => {
  const { canonicalKph, setCanonicalKph } = useContext(CurrentValues);
  const currentKph = canonicalKph ? toKph(canonicalKph) : null
  const [kph, setKph] = useState(currentKph);
  if (currentKph != kph) {
    setKph(currentKph)
  }

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const receivedKph = event.currentTarget.valueAsNumber;
    const kph = receivedKph || 0;
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
        value={displayInputValue(kph)}
        onChange={onChange}
        onKeyDown={leaveFieldOnEnter}
      />
    </div>
  );
};
