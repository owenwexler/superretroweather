interface ICurrentConditions {
  wdir: number;
  temp: number;
  sunrise: string;
  visibility: number;
  wspd: number;
  icon: string;
  stations: string;
  heatindex: null,
  cloudcover: number;
  datetime: string;
  precip: number;
  moonphase: number;
  snowdepth: null,
  sealevelpressure: number;
  dew: number;
  sunset: string;
  humidity: number;
  wgust: number;
  windchill: number | null
}

export type {
  ICurrentConditions
}
