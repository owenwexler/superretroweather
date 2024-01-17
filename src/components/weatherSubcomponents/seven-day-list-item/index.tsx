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
    temp,
    maxt,
    visibility,
    wspd,
    datetimeStr,
    heatindex,
    cloudcover,
    pop,
    mint,
    datetime,
    precip,
    snowdepth,
    snow,
    humidity,
    wgust,
    conditions,
    windchill
  } = sevenDayListItem;

  return (
    <div class="flex flex-col mt-2 items-center align-center text-center">
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
    </div>
  )
});