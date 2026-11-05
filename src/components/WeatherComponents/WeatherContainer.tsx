import Loading from '../Loading';
import Error from '../Error';
import CurrentConditions from './CurrentConditions';
import WeatherHeader from './WeatherHeader';
import SevenDayList from './SevenDayList';

import { useQuery } from '@tanstack/react-query';
import type { IVCWeatherResponse } from '#/typedefs/IVCWeatherResponse';

import { errors } from 'dataerror';
import type { DataErrorReturnObject } from 'dataerror';

import { snaxios } from '../../snaxios/snaxios';

interface WeatherContainerProps {
  location: string;
}

// Unwraps the /api/weather body ({ data, error }) so components get the weather data directly.
// Failures are thrown, not returned, because React Query only sets isError when queryFn throws.
const fetchWeather = async (location: string): Promise<IVCWeatherResponse> => {
  const response = await snaxios.get<DataErrorReturnObject<IVCWeatherResponse>>(
    encodeURI(`/api/weather?location=${location}`)
  );

  if (response.error) {
    throw response.error;
  }

  const body = response.data;

  if (!body || body.error || !body.data) {
    throw body?.error ?? errors.unknownError;
  }

  return body.data;
}

const WeatherContainer: React.FC<WeatherContainerProps> = ({ location }) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['srw', location],
    queryFn: () => fetchWeather(location),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return <Loading />
  }

  if (isError || !data) {
    console.error(error);
    return <Error />
  }

  return (
    <>
      <WeatherHeader name={data.location.name} />

      <CurrentConditions conditions={data.location.currentConditions} />

      <SevenDayList
        sevenDayList={data.location.values}
        location={data.location.name}
      />
    </>
  )
}

export default WeatherContainer;
