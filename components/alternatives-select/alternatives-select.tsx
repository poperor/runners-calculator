import { AlternativeProps } from "../../lib/conversion";
import { useRouter } from "next/router";
import styles from "./alternatives-select.module.css";

export const AlternativesSelect = ({
  inputSpeedType,
  resultSpeedType,
  speedTypes,
  role,
}: AlternativeProps) => {
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    router.push(`/${event.target.value}`)
  };
  const defaultValue = `${inputSpeedType.id}-to-${resultSpeedType.id}`;
  return (
    <select className={styles.select} value={defaultValue} onChange={handleChange}>
      <optgroup>
        {speedTypes.map((speedType) => {
          let href;
          if (role === "input") {
            href = `${speedType.id}-to-${resultSpeedType.id}`;
          }
          if (role === "result") {
            href = `${inputSpeedType.id}-to-${speedType.id}`;
          }
          return (
            <option key={href} value={href}>
              {speedType.name}
            </option>
          );
        })}
      </optgroup>
    </select>
  );
};
