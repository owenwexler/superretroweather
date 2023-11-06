import { server$ } from "@builder.io/qwik-city";
import { getOfflineWeatherData } from "~/helper/getOfflineWeatherData";
import type { IOfflineWeatherDataLookup } from "~/typedefs/IOfflineWeatherData";
import type { IVCWeatherResponse } from "~/typedefs/IVCWeatherResponse";

const getVCWeatherData = server$(async (location: string): Promise<IVCWeatherResponse> => {
  const VC_API_KEY = process.env.VC_API_KEY;

  if (!VC_API_KEY) {
    throw new Error('VisualCrossing API key missing');
  }

  try {
    if(process.env.QUIK_ENV === 'development' && process.env.DEV_MODE === 'offline') {
      const offlineWeatherData: IOfflineWeatherDataLookup = getOfflineWeatherData();

      const offlineLocationData = offlineWeatherData[location];

      if (offlineLocationData !== null && offlineLocationData !== undefined) {
        return offlineLocationData;
      }
    }

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&combinationMethod=aggregate&contentType=json&unitGroup=us&locationMode=single&key=${VC_API_KEY}&dataElements=default&locations=${location}`);

    const data = response.json() as unknown as IVCWeatherResponse;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
});

export {
  getVCWeatherData
}