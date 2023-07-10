import { useRouter } from "next/router";
import styles from "./speedtypes-readiogroup.module.css";
import { Dispatch, SetStateAction } from "react";
import { speedTypes } from "../../lib/config";

export interface SpeedtypesRadiogroupProps {
  disabledInputId: string;
  setSelectedSpeedTypeId: Dispatch<SetStateAction<string>>;
  role: string;
}

export const SpeedtypesRadiogroup = ({
  disabledInputId,
  setSelectedSpeedTypeId,
  role,
}: SpeedtypesRadiogroupProps) => {
  const router = useRouter();

  const handleChange = (event: { target: { value: any } }) => {
    const speedTypeId = event.target.value;
    setSelectedSpeedTypeId(speedTypeId);
  };

  return (
    <div className={styles.speedTypesRadiogroup}>
      {speedTypes.map((speedType) => {
        return (
          <div key={speedType.id} className={styles.speedType}>
            <input
              type="radio"
              id={speedType.id}
              name={role}
              value={speedType.id}
              onChange={handleChange}
              disabled={disabledInputId === speedType.id}
            />
            <label htmlFor={speedType.id}>{speedType.name}</label>
          </div>
        );
      })}
    </div>
  );
};
