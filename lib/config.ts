import { KphResult } from "../components/results/kph-result";
import { KphInput } from "../components/inputs/kph-input";
import { MinutesPerKmResult } from "../components/results/minutes-per-km-result";
import { MinutesPerKmInput } from "../components/inputs/minutes-per-km-input";
import {
  ResultProps,
} from "./conversion";

export interface SpeedType {
  id: string;
  name: string;
  inputComponent: () => JSX.Element;
  resultComponent: ({ canonicalKph }: ResultProps) => JSX.Element;
}

export const speedTypes: SpeedType[] = [
  {
    id: "kph",
    name: "kilometers per hour",
    inputComponent: KphInput,
    resultComponent: KphResult,
  },
  {
    id: "minutes-per-km",
    name: "minutes per kilometer",
    inputComponent: MinutesPerKmInput,
    resultComponent: MinutesPerKmResult,
  },
];

export interface Params {
  params: {
    id: string;
  };
}

export const getAllCalculatorPaths = (): Array<Params> => {
  const paths = speedTypes.flatMap((inputSpeedType) =>
    speedTypes
      .filter((resultSpeedType) => inputSpeedType.id !== resultSpeedType.id)
      .map(
        (resultSpeedType) => inputSpeedType.id + "-to-" + resultSpeedType.id
      )
  );
  const params = paths.map((path) => ({
    params: {
      id: path,
    },
  }));
  return params;
};
