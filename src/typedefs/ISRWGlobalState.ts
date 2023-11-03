import type { IVCWeatherResponse } from "./IVCWeatherResponse";

interface ISRWGlobalState {
  currentCityText: string | null;
  currentWeatherData: IVCWeatherResponse | null;
  weatherDataIsLoading: boolean;
  weatherDataIeErrored: boolean;
  lastFiveCities: string[]
}

export type {
  ISRWGlobalState
}