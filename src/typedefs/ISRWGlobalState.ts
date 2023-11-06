import type { IVCWeatherResponse } from "./IVCWeatherResponse";

interface ISRWGlobalState {
  currentCityText: string | null;
  currentWeatherData: IVCWeatherResponse | { error: string } | null;
  weatherDataIsLoading: boolean;
  weatherDataIsErrored: boolean;
  lastFiveCities: string[]
}

export type {
  ISRWGlobalState
}