import Loading from '../Loading';
import Error from '../Error';
import CurrentConditions from './CurrentConditions';
import WeatherHeader from './WeatherHeader';
import SevenDayList from './SevenDayList';

import { useQuery } from '@tanstack/react-query';
import { getWeatherData } from '#/server/server';
import type { IVCWeatherResponse } from '#/typedefs/IVCWeatherResponse';

interface WeatherContainerProps {
  location: string;
}

const WeatherContainer: React.FC<WeatherContainerProps> = ({ location }) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['srw', location],
    queryFn: () => getWeatherData({ data: { location } }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5
  });


  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    console.error(error);
    return <Error />
  }

  const weather = data! as IVCWeatherResponse;

  return (
    <>
      <WeatherHeader name={weather.location.name} />

      <CurrentConditions conditions={weather.location.currentConditions} />

      <SevenDayList
        sevenDayList={weather.location.values}
        location={weather.location.name}
      />
    </>
  )
}

export default WeatherContainer;
