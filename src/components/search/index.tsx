import { component$ } from '@builder.io/qwik';
import SrwInput from '../style/srw-input';
import SrwButton from '../style/srw-button';

export default component$(() => {
  return (
    <div class="flex flex-row items-center justify-center space-x-3">
      <SrwInput inputId="srw-search-input" inputPlaceholder="Enter location..." />
      <SrwButton buttonId="srw-search-btn"><p class="text-xs text-white">SEARCH</p></SrwButton>
    </div>
  )
});