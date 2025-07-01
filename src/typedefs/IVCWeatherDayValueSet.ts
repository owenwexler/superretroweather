interface IVCWeatherDayValueSet {
  wdir?: number;
  temp: number;
  maxt: number;
  visibility: number;
  wspd: number;
  datetimeStr: string;
  heatindex: number | null;
  cloudcover: number;
  pop: number;
  mint: number;
  datetime: number;
  precip: number;
  snowdepth: number;
  snow:number;
  humidity: number;
  wgust: number;
  conditions: string;
  windchill: number | null
}

export type {
  IVCWeatherDayValueSet
}
