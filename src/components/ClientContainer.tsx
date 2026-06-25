import { useAtom } from 'jotai';
import NoWeatherData from './NoWeatherData';

import WeatherContainer from './WeatherComponents/WeatherContainer';
import { currentLocationAtom } from '#/store/weatherStore';

const ClientContainer: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);

  return (
    <div className="flex flex-col align-center-items-center text-center space-y-3">
      {
        currentLocation === ''
        ?
        <NoWeatherData />
        :
        <WeatherContainer location={currentLocation} />
      }
    </div>
  )
}

export default ClientContainer;
