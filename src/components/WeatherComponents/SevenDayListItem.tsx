import type { FC } from 'preact/compat';
import { formatDateMMDDYY } from '../../helper/formatDateMMDDYY';
import type { IVCWeatherDayValueSet } from '../../typedefs/IVCWeatherDayValueSet'
import type { TConditionImageType } from '../../typedefs/TConditionImageType';
import WeatherConditionImage from './WeatherConditionImage';

interface SevenDayListItemProps {
  sevenDayListItem: IVCWeatherDayValueSet;
}

const SevenDayListItem: FC<SevenDayListItemProps> = ({ sevenDayListItem }) => {
  const {
    maxt,
    visibility,
    wspd,
    datetimeStr,
    cloudcover,
    heatindex,
    mint,
    precip,
    snowdepth,
    snow,
    humidity,
    wgust,
    conditions,
    windchill
  } = sevenDayListItem;

  const condition = conditions.toLowerCase() as TConditionImageType;

  return (
    <div className="flex flex-col mt-2 items-center align-center text-center space-y-1">
      <div className="flex flex-row items-center align-center space-x-12">
        <WeatherConditionImage
          condition={condition}
          width={50}
          height={50}
        />
        <h2 className="text-xl text-white">{formatDateMMDDYY(datetimeStr)}</h2>
      </div>
      <div className="flex flex-row items-center align-center space-x-12">
        <h2 className="text-lg max-sm:text-sm text-white">LOW: {Math.round(mint)}º</h2>
        <h2 className="text-lg max-sm:text-sm text-white">HIGH: {Math.round(maxt)}º</h2>
      </div>
      <div className="flex flex-row items-center align-center space-x-12">
        <h3 className="text-sm text-white">WSPD: {Math.round(wspd)}</h3>
        <h3 className="text-sm text-white">WGUST: {Math.round(wgust)}</h3>
      </div>
      <div className="flex flex-row items-center align-center space-x-12">
        <h3 className="text-sm text-white">WCHILL: {windchill ? Math.round(windchill) : 0}</h3>
      </div>
      <div className="flex flex-row max-sm:flex-col items-center align-center space-x-12">
        <h3 className="text-sm text-white">VISIBILITY: {Math.round(visibility)}</h3>
      </div>
      <div className="flex flex-row max-sm:flex-col items-center align-center space-x-12">
        <h3 className="text-sm text-white">CLOUD COVER: {Math.round(cloudcover)}</h3>
      </div>
      <div className="flex flex-row items-center align-center space-x-12">
        <h3 className="text-sm text-white">HUMIDITY: {Math.round(humidity)}</h3>
      </div>
      {
        heatindex
        ?
        <div className="flex flex-row items-center align-center space-x-12">
          <h3 className="text-sm text-white">HEAT INDEX: {Math.round(heatindex)}</h3>
        </div>
        :
        null
      }
      {
        precip > 0
        ?
          <div className="flex flex-row items-center align-center space-x-12">
            <h3 className="text-sm text-white">PRECIP: {Math.round(precip)}</h3>
          </div>
        :
          null
      }
      {
        snow > 0 || snowdepth > 0
        ?
          <div className="flex flex-row items-center align-center space-x-12">
            <h3 className="text-sm text-white">SNOW: {Math.round(snow)}</h3>
            <h3 className="text-sm text-white">DEPTH: {Math.round(snowdepth)}"</h3>
          </div>
        :
          null
      }
    </div>
  )
}

export default SevenDayListItem