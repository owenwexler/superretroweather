import type { IVCWeatherResponse } from "../typedefs/IVCWeatherResponse";
import { getOfflineWeatherData } from "./getOfflineWeatherData";

interface IGetVCWeatherDataAdditionalArgs {
  viteEnv: 'development' | 'production',
  devMode: 'offline' | 'online'
  apiKey: string;
}

const getVCWeatherData = async (location: string, args: IGetVCWeatherDataAdditionalArgs ): Promise<IVCWeatherResponse> => {
  const {
    viteEnv,
    devMode,
    apiKey
  } = args;

  if (!apiKey) {
    throw new Error('VisualCrossing API key missing');
  }

  try {
    if(viteEnv === 'development' && devMode === 'offline') {
      const offlineWeatherData: IVCWeatherResponse = await getOfflineWeatherData(location);

      if (offlineWeatherData !== null && offlineWeatherData !== undefined) {
        return offlineWeatherData;
      }
    }

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&combinationMethod=aggregate&contentType=json&unitGroup=us&locationMode=single&key=${apiKey}&dataElements=default&locations=${location}`);

    const data = response.json() as unknown as IVCWeatherResponse;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
}

export {
  getVCWeatherData
}