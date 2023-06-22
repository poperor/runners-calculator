import { KphResult } from "../components/results/kph-result";
import { KphInput } from "../components/inputs/kph-input";
import { PacePerKmResult } from "../components/results/pace-per-km-result";
import { PacePerKmInput } from "../components/inputs/pace-per-km-input";
import {
  ResultProps,
} from "./conversion";
import { DistanceTimeInput } from "../components/inputs/distance-time-input";
import { DistanceTimeResult } from "../components/results/distance-time-result ";
import { PacePerMileInput } from "../components/inputs/pace-per-mile-input";
import { PacePerMileResult } from "../components/results/pace-per-mile-result";

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
    id: "pace-per-km",
    name: "pace per kilometer",
    inputComponent: PacePerKmInput,
    resultComponent: PacePerKmResult,
  },
  {
    id: "pace-per-mile",
    name: "pace per mile",
    inputComponent: PacePerMileInput,
    resultComponent: PacePerMileResult,
  },
  {
    id: "distance-time",
    name: "distance time",
    inputComponent: DistanceTimeInput,
    resultComponent: DistanceTimeResult,
  }
];

export interface Params {
  params: {
    id: string;
  };
}

export const getAllCalculatorPaths = (): Array<Params> => {
  const paths = speedTypes.flatMap((inputSpeedType) =>
    speedTypes
      .filter((resultSpeedType) => inputSpeedType.id !== resultSpeedType.id || resultSpeedType.id === "distance-time")
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
