import { component$ } from '@builder.io/qwik';
import { formatDateMMDDYY } from '~/helper/formatDateMMDDYY';
import { formatTime } from '~/helper/formatTime';

import { getPicNameFromCondition } from '~/helper/getPicNameFromCondition';
import type { ICurrentConditions } from '~/typedefs/ICurrentConditions';

interface ICurrentConditionsProps {
  currentConditions: ICurrentConditions;
}

export default component$((props: ICurrentConditionsProps) => {
  const { currentConditions } = props;

  const picName = getPicNameFromCondition(currentConditions.icon);

  return (
    <div class="flex flex-col mt-5 items-center justify-center text-center">
      <h1 class="text-white text-3xl">{formatDateMMDDYY(currentConditions.datetime)}</h1>
      <div class="flex flex-row space-x-5 items-center justify-center">
        <img src={`/images/istock/${picName}?url&jsx`} height="100" width="100"></img>
        <h1 class="text-white text-4xl">{Math.round(currentConditions.temp)}º</h1>
      </div>
      <div class="flex flex-row items-center justify-center space-x-5">
        <h5 class="text-lg max-md:text-sm text-white">WSPD: {Math.round(currentConditions.wspd)}</h5>
        <h5 class="text-lg max-md:text-sm text-white">GUST: {Math.round(currentConditions.wgust)}</h5>
      </div>
      <div class="flex flex-row items-center justify-center space-x-5">
        <h5 class="text-lg max-md:text-sm text-white">VISIBILITY: {Math.round(currentConditions.visibility)}</h5>
      </div>
      <div class="flex flex-row items-center justify-center space-x-5">
        <h5 class="text-lg max-md:text-sm text-white">CLOUD COVER: {Math.round(currentConditions.cloudcover)}</h5>
      </div>
      <div class="flex flex-row items-center justify-center space-x-5">
        <h5 class="text-lg max-md:text-sm text-white">HUMIDITY: {Math.round(currentConditions.humidity)}</h5>
      </div>
      <div class="flex flex-row items-center justify-center space-x-5">
        <h5 class="text-lg max-md:text-sm text-white">PRECIP: {Math.round(currentConditions.precip)}</h5>
      </div>
      <div class="flex flex-row items-center justify-center space-x-8">
        <div class="flex flex-row items-center justify-center space-x-1">
          <img src={`/images/istock/clear.png`} height="40" width="40"></img>
          <h5 class="text-lg max-md:text-xs text-white">{currentConditions.sunrise ? `${formatTime(currentConditions.sunrise)}` : 'N/D'}</h5>
        </div>
        <div class="flex flex-row items-center justify-center space-x-1">
          <img src={`/images/istock/partly-cloudy.png`} height="40" width="40"></img>
          <h5 class="text-lg max-md:text-xs text-white">{currentConditions.sunset ? formatTime(currentConditions.sunset) : 'N/D'}</h5>
        </div>
      </div>
    </div>
  )
});