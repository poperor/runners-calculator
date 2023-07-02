import { useContext ,KeyboardEvent } from "react";
import styles from "./input.module.css";
import utilityStyles from "../../styles/utility.module.css";
import { CurrentValues } from "../../context/current-values";

export const MphInput = () => {
  const { mph, changedMph } = useContext(CurrentValues);


  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const mph = event.currentTarget.value.replace(/[^0-9.]/g, "");
    changedMph(mph);
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
