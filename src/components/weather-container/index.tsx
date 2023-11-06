import { component$, useContext } from '@builder.io/qwik';
import { GlobalStateContext } from '~/root';
import Loading from '../style/loading';
import WeatherDataError from '../weather-data-error';
import type { IVCWeatherResponse } from '~/typedefs/IVCWeatherResponse';

export default component$(() => {
  const globalState = useContext(GlobalStateContext);

  if (globalState.weatherDataIsLoading) {
    return <Loading />
  }

  if (globalState.weatherDataIsErrored) {
    return <WeatherDataError />
  }

  const currentWeatherData = globalState.currentWeatherData ? globalState.currentWeatherData as IVCWeatherResponse : null;

  return (
    <div class="space-y-4 text-center">

    </div>
  );
});