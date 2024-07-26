import type { IError } from "./IError";
import type { IVCWeatherResponse } from "./IVCWeatherResponse";

interface ISRWGlobalState {
  currentCityText: string | null;
  currentWeatherData: IVCWeatherResponse;
  weatherDataIsLoading: boolean;
  weatherDataIsErrored: boolean;
  lastFiveCities: string[]
}

export type {
  ISRWGlobalState
}