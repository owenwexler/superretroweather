import { component$ } from '@builder.io/qwik';
import WeatherConditionImage from '~/components/style/weather-condition-image';
import { formatDateMMDDYY } from '~/helper/formatDateMMDDYY';

import type { IVCWeatherDayValueSet } from '~/typedefs/IVCWeatherDayValueSet';
import type { TConditionImageType } from '~/typedefs/TConditionImageType';

interface ISevenDayListItemProps {
  sevenDayListItem: IVCWeatherDayValueSet;
}

export default component$((props: ISevenDayListItemProps) => {
  const { sevenDayListItem } = props;

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

  return (
    <div class="flex flex-col mt-2 items-center align-center text-center space-y-2">
      <div class="flex flex-row items-center align-center space-x-12">
        <WeatherConditionImage
          condition={conditions.toLowerCase() as TConditionImageType}
          width={50}
          height={50}
        />
        <h2 class="text-xl text-white">{formatDateMMDDYY(datetimeStr)}</h2>
      </div>
      <div class="flex flex-row items-center align-center space-x-12">
        <h2 class="text-lg text-white">LOW: {Math.round(mint)}º</h2>
        <h2 class="text-lg text-white">HIGH: {Math.round(maxt)}º</h2>
      </div>
      <div class="flex flex-row items-center align-center space-x-12">
        <h3 class="text-md text-white">WSPD: {Math.round(wspd)}</h3>
        <h3 class="text-md text-white">WGUST: {Math.round(wgust)}</h3>
      </div>
      <div class="flex flex-row items-center align-center space-x-12">
        <h3 class="text-md text-white">WCHILL: {windchill ? Math.round(windchill) : 0}</h3>
      </div>
      <div class="flex flex-row max-sm:flex-col items-center align-center space-x-12">
        <h3 class="text-md text-white">VISIBILITY: {Math.round(visibility)}</h3>
      </div>
      <div class="flex flex-row max-sm:flex-col items-center align-center space-x-12">
        <h3 class="text-md text-white">CLOUD COVER: {Math.round(cloudcover)}</h3>
      </div>
      <div class="flex flex-row items-center align-center space-x-12">
        <h3 class="text-md text-white">HUMIDITY: {Math.round(humidity)}</h3>
      </div>
      {
        heatindex
        ?
        <div class="flex flex-row items-center align-center space-x-12">
          <h3 class="text-md text-white">HEAT INDEX: {Math.round(heatindex)}</h3>
        </div>
        :
        null
      }
      {
        precip > 0
        ?
        <div class="flex flex-row items-center align-center space-x-12">
          <h3 class="text-md text-white">PRECP: {Math.round(precip)}</h3>
        </div>
        :
        null
      }
      {
        snow > 0 || snowdepth > 0
        ?
        <div class="flex flex-row items-center align-center space-x-12">
          <h3 class="text-md text-white">SNOW: {Math.round(snow)}</h3>
          <h3 class="text-md text-white">DEPTH: {Math.round(snowdepth)}"</h3>
        </div>
        :
        null
      }
    </div>
  )
});