import type { FC } from 'preact/compat';
import { formatDateMMDDYY } from '../../helper/formatDateMMDDYY';
import { formatTime } from '../../helper/formatTime';
import type { ICurrentConditions } from '../../typedefs/ICurrentConditions'
import type { TConditionImageType } from '../../typedefs/TConditionImageType';
import WeatherConditionImage from './WeatherConditionImage';

interface CurrentConditionsProps {
  conditions: ICurrentConditions;
}

const CurrentConditions: FC<CurrentConditionsProps> = ({ conditions }) => {
  const conditionIcon = conditions.icon ? conditions.icon as TConditionImageType : 'clear';

  return (
    <div className="flex flex-col mt-5 items-center justify-center text-center">
      <h1 className="text-white text-3xl max-sm:text-xl">{formatDateMMDDYY(conditions.datetime)}</h1>
      <div className="flex flex-row space-x-5 items-center justify-center">
        <WeatherConditionImage
          condition={conditionIcon}
          width={100}
          height={100}
        />
        <h1 className="text-white text-4xl max-sm:text-2xl">{Math.round(conditions.temp)}º</h1>
      </div>
      <div className="flex flex-row items-center justify-center space-x-5">
        <h5 className="text-lg max-md:text-sm text-white">WSPD: {Math.round(conditions.wspd)}</h5>
        <h5 className="text-lg max-md:text-sm text-white">GUST: {Math.round(conditions.wgust)}</h5>
      </div>
      <div className="flex flex-row items-center justify-center space-x-5">
        <h5 className="text-lg max-md:text-sm text-white">VISIBILITY: {Math.round(conditions.visibility)}</h5>
      </div>
      <div className="flex flex-row items-center justify-center space-x-5">
        <h5 className="text-lg max-md:text-sm text-white">CLOUD COVER: {Math.round(conditions.cloudcover)}</h5>
      </div>
      <div className="flex flex-row items-center justify-center space-x-5">
        <h5 className="text-lg max-md:text-sm text-white">HUMIDITY: {Math.round(conditions.humidity)}</h5>
      </div>
      <div className="flex flex-row items-center justify-center space-x-5">
        <h5 className="text-lg max-md:text-sm text-white">PRECIP: {Math.round(conditions.precip)}</h5>
      </div>
      <div className="flex flex-col items-center justify-center text-center mt-2 space-y-1">
        <div className="flex flex-row items-center justify-center space-x-2">
          <p className="text-lg max-md:text-sm text-white">SUNRISE:</p>
          <h5 className="text-lg max-md:text-sm text-white">{conditions.sunrise ? `${formatTime(conditions.sunrise)}` : 'N/D'}</h5>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2">
          <p className="text-lg max-md:text-sm text-white">SUNSET:</p>
          <h5 className="text-lg max-md:text-sm text-white">{conditions.sunset ? formatTime(conditions.sunset) : 'N/D'}</h5>
        </div>
      </div>
    </div>
  )
}

export default CurrentConditions