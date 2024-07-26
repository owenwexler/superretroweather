import { useQuery } from '@tanstack/react-query';
import NoWeatherData from '../NoWeatherData';
import Loading from '../Loading';
import Error from '../Error';
import CurrentConditions from './CurrentConditions';
import WeatherHeader from './WeatherHeader';
import SevenDayList from './SevenDayList';

interface WeatherContainerProps {
  location: string;
}

const fetchWeatherData = async (location: string) => {
  const response = await fetch(`/api/weather?location=${location.split(' ').join('%20')}`);
  const data = await response.json();
  return data;
}

const WeatherContainer: React.FC<WeatherContainerProps> = ({ location }) => {
  const { isLoading, isError, data, error  } = useQuery({ queryKey: [`weather-${location}`], queryFn: () => fetchWeatherData(location) })

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