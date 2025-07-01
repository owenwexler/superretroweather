import Loading from '../Loading';
import Error from '../Error';
import CurrentConditions from './CurrentConditions';
import WeatherHeader from './WeatherHeader';
import SevenDayList from './SevenDayList';

import { blankVCResponse } from '../../data/blankVCResponse';

import { useState, useEffect } from 'preact/hooks';

import type { IVCWeatherResponse } from '../../typedefs/IVCWeatherResponse';

interface WeatherContainerProps {
  location: string;
}

const fetchWeatherData = async (location: string) => {
  const response = await fetch(`/api/weather?location=${location.split(' ').join('%20')}`);
  const data = await response.json();
  return data;
}

const WeatherContainer: React.FC<WeatherContainerProps> = ({ location }) => {
  // I haven't done an old-school useEffect fetch in so long I had to look up how to do it

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<IVCWeatherResponse>(blankVCResponse);
  const [error, setError] = useState<{error: string}>({ error: '' });

  useEffect(() => {
    setIsLoading(true);
    fetchWeatherData(location)
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error);
        setIsError(true);
        setIsLoading(false);
      })
  }, [location]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
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
