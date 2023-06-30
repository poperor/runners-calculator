import { useState, useContext ,KeyboardEvent } from "react";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { toKph } from "../../lib/conversion";
import { CurrentValues } from "../../context/current-values";

export const KphInput = () => {
  const { canonicalKph, setCanonicalKph, setInputDistance } = useContext(CurrentValues);
  const currentKph = canonicalKph ? toKph(canonicalKph) : null;
  const [kph, setKph] = useState(currentKph?.toString() || null);
  const numericKph = kph ? Number(kph) : null;
  if (currentKph !== numericKph) {  
    setKph(currentKph?.toString() || null);
  }

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const kph = event.currentTarget.value.replace(/[^0-9.]/g, "");
    setKph(kph);
    setInputDistance(Number.parseFloat(kph) * 1000);
    setCanonicalKph(Number.parseFloat(kph));
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
        type="text"
        inputMode="numeric"
        value={kph || ""}
        onChange={onChange}
        onKeyDown={leaveFieldOnEnter}
      />
    </div>
  );
};
