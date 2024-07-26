import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import NoWeatherData from './NoWeatherData';

import { useStore } from '@nanostores/react';
import { $currentLocation } from '../store/weatherStore';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import WeatherContainer from './WeatherComponents/WeatherContainer';

const ClientContainer: React.FC = () => {
  const queryClient = new QueryClient();

  const currentLocation = useStore($currentLocation);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col align-center-items-center text-center space-y-3">
        {
          currentLocation === ''
          ?
          <NoWeatherData />
          :
          <WeatherContainer location={currentLocation} />
        }
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}

export default ClientContainer