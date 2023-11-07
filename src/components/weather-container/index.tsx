import { component$ } from '@builder.io/qwik';
import WeatherDataError from '../weather-data-error';
import type { IVCWeatherResponse } from '~/typedefs/IVCWeatherResponse';
import CurrentConditions from '../weatherSubcomponents/current-conditions';

interface IWeatherContainerProps {
  weatherData: IVCWeatherResponse | null;
  loading: boolean;
  error: boolean;
}

export default component$((props: IWeatherContainerProps) => {
  const {
    weatherData,
    error
  } = props;

  const typedWeatherData = weatherData as unknown as IVCWeatherResponse;

  if (error) {
    return <WeatherDataError />
  }

  return (
    <div class="space-y-2 text-center">
      <h1 class="text-white text-3xl">{typedWeatherData.location.name}</h1>
      <CurrentConditions currentConditions={typedWeatherData.location.currentConditions} />
    </div>

  );
});