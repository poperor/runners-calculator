import { useState, useContext ,KeyboardEvent } from "react";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { fromMph, toMph } from "../../lib/conversion";
import { CurrentValues } from "../../context/current-values";

export const MphInput = () => {
  const { canonicalKph, setCanonicalKph } = useContext(CurrentValues);
  const currentMph = canonicalKph ? toMph(canonicalKph) : null;
  const [mph, setMph] = useState(currentMph?.toString() || null);
  const numericMph = mph ? Number(mph) : null;
  if (currentMph !== numericMph) {  
    setMph(currentMph?.toString() || null);
  }

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const mph = event.currentTarget.value.replace(/[^0-9.]/g, "");
    setMph(mph);
    setCanonicalKph(fromMph(Number.parseFloat(mph)));
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
        value={mph || ""}
        onChange={onChange}
        onKeyDown={leaveFieldOnEnter}
      />
    </div>
  );
};
