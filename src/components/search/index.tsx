import {  component$, useContext, useSignal, $ } from '@builder.io/qwik';

import SrwButton from '../style/srw-button';
import { GlobalStateContext } from '~/root';

export default component$(() => {
  const globalState = useContext(GlobalStateContext);

  const currentText = useSignal('');

  const handleClick = $(() => {
    globalState.currentCityText = currentText.value;
    currentText.value = '';
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