import Loading from '../Loading';
import Error from '../Error';
import CurrentConditions from './CurrentConditions';
import WeatherHeader from './WeatherHeader';
import SevenDayList from './SevenDayList';

import { blankVCResponse } from '../../data/blankVCResponse';

import { useState, useEffect } from 'react';

import type { IVCWeatherResponse } from '../../typedefs/IVCWeatherResponse';
import { useQuery } from '@tanstack/react-query';
import { getWeatherData } from '#/server/server';

interface WeatherContainerProps {
  location: string;
}

const fetchWeatherData = async (location: string) => {
  const response = await fetch(`/api/weather?location=${location.split(' ').join('%20')}`);
  const data = await response.json();
  return data;
}

const WeatherContainer: React.FC<WeatherContainerProps> = ({ location }) => {

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['srw', location],
    queryFn: () => getWeatherData({ location }), // Execute server function
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5
  })


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
