import type { ICurrentConditions } from "./ICurrentConditions";
import type { IVCWeatherDayValueSet } from "./IVCWeatherDayValueSet";

interface IVCLocationData {
  stationContributions: string | null;
  values: IVCWeatherDayValueSet[];
  id: string;
  address: string;
  name: string;
  index: number;
  latitude: number;
  longitude: number;
  distance: number;
  time: number;
  tz: string;
  currentConditions: ICurrentConditions;
  alerts: string | null;
}

export type {
  IVCLocationData
}