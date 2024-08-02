import NoWeatherData from './NoWeatherData';

import { useStore } from '@nanostores/preact';
import { $currentLocation } from '../store/weatherStore';

import WeatherContainer from './WeatherComponents/WeatherContainer';

const ClientContainer: React.FC = () => {
  const currentLocation = useStore($currentLocation);

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

export default ClientContainer