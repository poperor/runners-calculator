import { useContext, KeyboardEvent } from "react";
import styles from "./input.module.css";
import { CurrentValues } from "../../context/current-values";

export const KphInput = () => {
  const { kph, changedKph } = useContext(CurrentValues);

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const kph = event.currentTarget.value.replace(/[^0-9.]/g, "");
    changedKph(kph);
  };

  const leaveFieldOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div>
      <div className={styles.timeinputbox}>
        <input
          className={styles.speedinput}
          type="text"
          inputMode="numeric"
          value={kph || ""}
          onChange={onChange}
          onKeyDown={leaveFieldOnEnter}
        />
      </div>
    </div>
  );
};
