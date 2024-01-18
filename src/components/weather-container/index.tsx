import { component$ } from '@builder.io/qwik';
import WeatherDataError from '../weather-data-error';
import type { IVCWeatherResponse } from '~/typedefs/IVCWeatherResponse';
import CurrentConditions from '../weatherSubcomponents/current-conditions';
import SevenDayList from '../weatherSubcomponents/seven-day-list';
import NotFound from '../not-found';

interface IWeatherContainerProps {
  weatherData: IVCWeatherResponse | null;
  loading: boolean;
  error: string | null | undefined;
}

export default component$((props: IWeatherContainerProps) => {
  const {
    weatherData,
    error
  } = props;

  const typedWeatherData = weatherData as unknown as IVCWeatherResponse;

  console.log(typedWeatherData)
  console.log('error: ', error)

  if (error && error !== '') {
    if (error === 'not found') {
      return <NotFound />
    } else {
      return <WeatherDataError />
    }
  }

  return (
    <div class="space-y-2 text-center">
      <h1 class="text-white text-3xl">{typedWeatherData.location.name}</h1>
      <CurrentConditions currentConditions={typedWeatherData.location.currentConditions} />
      <SevenDayList
        cityName={typedWeatherData.location.id}
        sevenDayData={typedWeatherData.location.values}
      />
    </div>

  );
});