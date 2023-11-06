import {  component$, useContext, useSignal, $ } from '@builder.io/qwik';

import SrwButton from '../style/srw-button';
import { GlobalStateContext } from '~/root';
import { getVCWeatherData } from '~/serverFunctions/getVCWeatherData';

import type { IVCWeatherResponse } from '~/typedefs/IVCWeatherResponse';


export default component$(() => {
  const globalState = useContext(GlobalStateContext);

  const currentText = useSignal('');

  const handleClick = $(async () => {
    globalState.weatherDataIsLoading = true;
    globalState.weatherDataIsErrored = false;
    try {
      const weatherResponse = await getVCWeatherData(currentText.value);
      const weatherData = weatherResponse as unknown as IVCWeatherResponse;
      globalState.currentCityText = currentText.value;
      globalState.currentWeatherData = weatherData;
      globalState.weatherDataIsLoading = false;
      currentText.value = '';
    } catch (error) {
      globalState.currentCityText = '';
      globalState.weatherDataIsErrored = true;
      globalState.currentWeatherData = { error: error as string }
    }
  });

  return (
    <div class="flex flex-row items-center justify-center space-x-3">
      <input
      class="bg-black border border-4 border-white text-white p-3 pl-2 text-xs"
      id="srw-search-text"
      type="text"
      bind:value={currentText}
      placeholder="Enter location..."
    />
      <SrwButton buttonId="srw-search-btn" clickFunction={handleClick} ><p class="text-xs text-white">SEARCH</p></SrwButton>
    </div>
  )
});