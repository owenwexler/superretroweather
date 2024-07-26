import type { IVCLocationData } from "./IVCLocationData";
import type { IVCWeatherColumnSet } from "./IVCWeatherColumnSet";

interface IVCWeatherResponse {
  error? : string;
  columns: IVCWeatherColumnSet;
  remainingCost: number;
  queryCost: number;
  messages: string | null;
  location: IVCLocationData;

}

export type {
  IVCWeatherResponse
}