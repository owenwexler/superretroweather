import Loading from '../Loading';
import Error from '../Error';
import NotFound from '../NotFound';
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
const isLocationNotFound = (value: unknown): boolean => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    value.code === 'location_not_found'
  );
}

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

  // Some responses come back with HTTP 200 but no weather, for example an unknown location in offline mode.  Treat them as errors so the error state is shown.
  if (body.data.error) {
    throw {
      ...errors.unknownError,
      code: 'location_not_found',
      message: 'Location not found',
      details: body.data.error
    };
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

    if (isLocationNotFound(error)) {
      return <NotFound />
    }

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
