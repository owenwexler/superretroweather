import type { IVCWeatherColumn } from "./IVCWeatherColumn";

interface IVCWeatherColumnSet {
  temp: IVCWeatherColumn;
  maxt: IVCWeatherColumn;
  visibility: IVCWeatherColumn;
  wspd: IVCWeatherColumn;
  heatindex: IVCWeatherColumn;
  cloudcover: IVCWeatherColumn;
  pop: IVCWeatherColumn;
  mint: IVCWeatherColumn;
  datetime: IVCWeatherColumn;
  precip: IVCWeatherColumn;
  snowdepth: IVCWeatherColumn;
  snow: IVCWeatherColumn;
  name: IVCWeatherColumn;
  humidity: IVCWeatherColumn;
  wgust: IVCWeatherColumn;
  conditions: IVCWeatherColumn;
  windchill: IVCWeatherColumn;
}

export type {
  IVCWeatherColumnSet
}