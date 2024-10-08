const toronto = {
  columns: {
    temp: {
      id: "temp",
      name: "Temperature",
      type: 2,
      unit: "degf"
    },
    maxt: {
      id: "maxt",
      name: "Maximum Temperature",
      type: 2,
      unit: "degF"
    },
    visibility: {
      id: "visibility",
      name: "Visibility",
      type: 2,
      unit: "mi"
    },
    wspd: {
      id: "wspd",
      name: "Wind Speed",
      type: 2,
      unit: "mph"
    },
    heatindex: {
      id: "heatindex",
      name: "Heat Index",
      type: 2,
      unit: "degf"
    },
    cloudcover: {
      id: "cloudcover",
      name: "Cloud Cover",
      type: 2,
      unit: null
    },
    pop: {
      id: "pop",
      name: "Chance Precipitation (%)",
      type: 2,
      unit: null
    },
    mint: {
      id: "mint",
      name: "Minimum Temperature",
      type: 2,
      unit: "degF"
    },
    datetime: {
      id: "datetime",
      name: "Date time",
      type: 3,
      unit: null
    },
    precip: {
      id: "precip",
      name: "Precipitation",
      type: 2,
      unit: "in"
    },
    snowdepth: {
      id: "snowdepth",
      name: "Snow Depth",
      type: 2,
      unit: "in"
    },
    snow: {
      id: "snow",
      name: "Snow",
      type: 2,
      unit: "in"
    },
    name: {
      id: "name",
      name: "Name",
      type: 1,
      unit: null
    },
    humidity: {
      id: "humidity",
      name: "Relative Humidity",
      type: 2,
      unit: null
    },
    wgust: {
      id: "wgust",
      name: "Wind Gust",
      type: 2,
      unit: "mph"
    },
    conditions: {
      id: "conditions",
      name: "Conditions",
      type: 1,
      unit: null
    },
    windchill: {
      id: "windchill",
      name: "Wind Chill",
      type: 2,
      unit: "degf"
    }
  },
  remainingCost: 0,
  queryCost: 1,
  messages: null,
  location: {
    stationContributions: null,
    values: [
      {
        temp: 40,
        maxt: 40.9,
        visibility: 10.1,
        wspd: 7.8,
        datetimeStr: "2023-10-31T00:00:00-04:00",
        heatindex: null,
        cloudcover: 90.2,
        pop: 27,
        mint: 38.9,
        datetime: 1698710400000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 62.2,
        wgust: 13.9,
        conditions: "Overcast",
        windchill: 33.3
      },
      {
        temp: 39.7,
        maxt: 42,
        visibility: 10.1,
        wspd: 10.9,
        datetimeStr: "2023-11-01T00:00:00-04:00",
        heatindex: null,
        cloudcover: 46.6,
        pop: 36,
        mint: 36.9,
        datetime: 1698796800000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 66.9,
        wgust: 20.8,
        conditions: "Partially cloudy",
        windchill: 29.2
      },
      {
        temp: 41.9,
        maxt: 47.9,
        visibility: 10.1,
        wspd: 16.4,
        datetimeStr: "2023-11-02T00:00:00-04:00",
        heatindex: null,
        cloudcover: 44.4,
        pop: 0,
        mint: 36.9,
        datetime: 1698883200000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 64.9,
        wgust: 26.4,
        conditions: "Partially cloudy",
        windchill: 28.7
      },
      {
        temp: 47.5,
        maxt: 52.1,
        visibility: 10.1,
        wspd: 17.7,
        datetimeStr: "2023-11-03T00:00:00-04:00",
        heatindex: null,
        cloudcover: 66.2,
        pop: 18,
        mint: 44,
        datetime: 1698969600000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 68.4,
        wgust: 28.9,
        conditions: "Partially cloudy",
        windchill: 36.7
      },
      {
        temp: 49.8,
        maxt: 50.6,
        visibility: 15,
        wspd: 13.3,
        datetimeStr: "2023-11-04T00:00:00-04:00",
        heatindex: null,
        cloudcover: 83,
        pop: 25,
        mint: 48.8,
        datetime: 1699056000000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 74.7,
        wgust: 30.1,
        conditions: "Overcast",
        windchill: 43.9
      },
      {
        temp: 49.9,
        maxt: 50.6,
        visibility: 7.6,
        wspd: 13.8,
        datetimeStr: "2023-11-05T00:00:00-04:00",
        heatindex: null,
        cloudcover: 79.9,
        pop: 44,
        mint: 48.6,
        datetime: 1699142400000,
        precip: 0.04,
        snowdepth: 0,
        snow: 0,
        humidity: 84,
        wgust: 24.8,
        conditions: "Overcast",
        windchill: 43.2
      },
      {
        temp: 46.5,
        maxt: 48.5,
        visibility: 4.2,
        wspd: 13.4,
        datetimeStr: "2023-11-06T00:00:00-05:00",
        heatindex: null,
        cloudcover: 78.3,
        pop: 44,
        mint: 44.5,
        datetime: 1699228800000,
        precip: 0.03,
        snowdepth: 0,
        snow: 0,
        humidity: 83.7,
        wgust: 23,
        conditions: "Overcast",
        windchill: 37.6
      },
      {
        temp: 43.9,
        maxt: 45.6,
        visibility: 11.8,
        wspd: 17.8,
        datetimeStr: "2023-11-07T00:00:00-05:00",
        heatindex: null,
        cloudcover: 84.1,
        pop: 62,
        mint: 40.5,
        datetime: 1699315200000,
        precip: 0.07,
        snowdepth: 0,
        snow: 0,
        humidity: 82.3,
        wgust: 29.5,
        conditions: "Rain, Overcast",
        windchill: 31.3
      },
      {
        temp: 32.2,
        maxt: 36,
        visibility: 15,
        wspd: 6.9,
        datetimeStr: "2023-11-08T00:00:00-05:00",
        heatindex: null,
        cloudcover: 33.1,
        pop: 47.6,
        mint: 29,
        datetime: 1699401600000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 42.8,
        wgust: 16.3,
        conditions: "Partially cloudy",
        windchill: 20.6
      },
      {
        temp: 34,
        maxt: 37.1,
        visibility: 15,
        wspd: 3.1,
        datetimeStr: "2023-11-09T00:00:00-05:00",
        heatindex: null,
        cloudcover: 61.7,
        pop: 28.6,
        mint: 31,
        datetime: 1699488000000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 41.9,
        wgust: 8.9,
        conditions: "Partially cloudy",
        windchill: 31.3
      },
      {
        temp: 38.3,
        maxt: 42,
        visibility: 9.9,
        wspd: 2.9,
        datetimeStr: "2023-11-10T00:00:00-05:00",
        heatindex: null,
        cloudcover: 87.9,
        pop: 23.8,
        mint: 34.2,
        datetime: 1699574400000,
        precip: 0.03,
        snowdepth: 0,
        snow: 0,
        humidity: 72.1,
        wgust: 7.8,
        conditions: "Overcast",
        windchill: 36.6
      },
      {
        temp: 42.6,
        maxt: 48.3,
        visibility: 13.3,
        wspd: 4.8,
        datetimeStr: "2023-11-11T00:00:00-05:00",
        heatindex: null,
        cloudcover: 49.6,
        pop: 14.3,
        mint: 37.8,
        datetime: 1699660800000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 74.3,
        wgust: 23,
        conditions: "Partially cloudy",
        windchill: 35.2
      },
      {
        temp: 47.9,
        maxt: 53.9,
        visibility: 15,
        wspd: 8.7,
        datetimeStr: "2023-11-12T00:00:00-05:00",
        heatindex: null,
        cloudcover: 84.4,
        pop: 14.3,
        mint: 41.1,
        datetime: 1699747200000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 66.6,
        wgust: 36.2,
        conditions: "Overcast",
        windchill: 36.8
      },
      {
        temp: 51.3,
        maxt: 53.3,
        visibility: 6.8,
        wspd: 11.8,
        datetimeStr: "2023-11-13T00:00:00-05:00",
        heatindex: null,
        cloudcover: 99.6,
        pop: 14.3,
        mint: 45.3,
        datetime: 1699833600000,
        precip: 0.31,
        snowdepth: 0,
        snow: 0,
        humidity: 71,
        wgust: 41.6,
        conditions: "Overcast",
        windchill: 40.4
      },
      {
        temp: 39.1,
        maxt: 44,
        visibility: 15,
        wspd: 10,
        datetimeStr: "2023-11-14T00:00:00-05:00",
        heatindex: null,
        cloudcover: 64.6,
        pop: 47.6,
        mint: 32.9,
        datetime: 1699920000000,
        precip: 0,
        snowdepth: 0,
        snow: 0,
        humidity: 61.1,
        wgust: 19.2,
        conditions: "Partially cloudy",
        windchill: 25.8
      }
    ],
    id: "Toronto, Canada",
    address: "Toronto, ON, Canada",
    name: "Toronto, Canada",
    index: 0,
    latitude: 43.6487,
    longitude: -79.3855,
    distance: 0,
    time: 0,
    tz: "America/Toronto",
    currentConditions: {
      wdir: 258,
      temp: 40.5,
      sunrise: "2023-10-31T07:51:46-04:00",
      visibility: 8.7,
      wspd: 6.6,
      icon: "cloudy",
      stations: "",
      heatindex: null,
      cloudcover: 100,
      datetime: "2023-10-31T18:50:00-04:00",
      precip: 0,
      moonphase: 0.59,
      snowdepth: null,
      sealevelpressure: 1016,
      dew: 21.3,
      sunset: "2023-10-31T18:09:58-04:00",
      humidity: 46,
      wgust: 0.2,
      windchill: 35.9
    },
    alerts: null
  }
}

export {
  toronto
}