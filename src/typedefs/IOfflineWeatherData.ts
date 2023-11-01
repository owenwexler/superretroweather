import type { IVCWeatherResponse } from "./IVCWeatherResponse";

interface IOfflineWeatherDataLookup {
  [key: string]: IVCWeatherResponse
}

export type {
  IOfflineWeatherDataLookup
}