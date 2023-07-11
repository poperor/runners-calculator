import styles from "./speedtypes-readiogroup.module.css";
import { Dispatch, SetStateAction } from "react";
import { speedTypes } from "../../lib/config";

export interface SpeedtypesRadiogroupProps {
  selectedSpeedTypeId: string;
  disabledInputId: string;
  setSelectedSpeedTypeId: Dispatch<SetStateAction<string>>;
  role: string;
}

export const SpeedtypesRadiogroup = ({
  selectedSpeedTypeId,
  disabledInputId,
  setSelectedSpeedTypeId,
  role,
}: SpeedtypesRadiogroupProps) => {

  const handleChange = (event: { target: { value: any } }) => {
    const speedTypeId = event.target.value;
    setSelectedSpeedTypeId(speedTypeId);
  };

  return (
    <div className={styles.speedTypesRadiogroup}>
      {speedTypes.map((speedType) => {
        const id = `${role}$-${speedType.id}`
        return (
          <div key={speedType.id} className={styles.speedType}>
            <input
              type="radio"
              id={id}
              name={role}
              value={speedType.id}
              onChange={handleChange}
              checked={selectedSpeedTypeId === speedType.id}
              disabled={disabledInputId === speedType.id}
            />
            <label htmlFor={id}>{speedType.name}</label>
          </div>
        );
      })}
    </div>
  );
};
