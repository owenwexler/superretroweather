import type { FC } from 'react';

interface WeatherHeaderProps {
  name: string;
}

const WeatherHeader: FC<WeatherHeaderProps> = ({ name }) => {
  return (
    <h1 id="weather-header" className="text-white text-3xl max-sm:text-xl">{name}</h1>
  )
}

export default WeatherHeader;
