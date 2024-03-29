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
import { MphInput } from "../components/inputs/mph-input";
import { MphResult } from "../components/results/mph-result";

export interface SpeedType {
  id: string;
  name: string;
  shortName: string;
  inputComponent: () => JSX.Element;
  resultComponent: ({ canonicalKph }: ResultProps) => JSX.Element;
}

export const speedTypes: SpeedType[] = [
  {
    id: "kph",
    name: "kilometers per hour",
    shortName: "kph",
    inputComponent: KphInput,
    resultComponent: KphResult,
  },
  {
    id: "mph",
    name: "miles per hour",
    shortName: "mph",
    inputComponent: MphInput,
    resultComponent: MphResult,
  },
  {
    id: "pace-per-km",
    name: "pace per kilometer",
    shortName: "pace per km",
    inputComponent: PacePerKmInput,
    resultComponent: PacePerKmResult,
  },
  {
    id: "pace-per-mile",
    name: "pace per mile",
    shortName: "pace per mile",
    inputComponent: PacePerMileInput,
    resultComponent: PacePerMileResult,
  },
  {
    id: "distance-time",
    name: "distance time",
    shortName: "distance time",
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
