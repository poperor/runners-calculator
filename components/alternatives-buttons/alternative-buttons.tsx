import Link from "next/link";
import { AlternativeProps } from "../../lib/conversion";

export const AlternativeButtons = ({inputSpeedType, resultSpeedType, speedTypes}: AlternativeProps) => {
  return (
    <div>
      {speedTypes.map(speedType => {
        let href = ''
        if (resultSpeedType) {
          href = `${speedType.id}-to-${resultSpeedType.id}`
        }
        if (inputSpeedType) {
          href = `${inputSpeedType.id}-to-${speedType.id}`
        }

        return (
          <div key={speedType.id}>
            <Link href={href}>
              {speedType.shortName}
            </Link>
          </div>
        )
      })}
    </div>
  );
};

