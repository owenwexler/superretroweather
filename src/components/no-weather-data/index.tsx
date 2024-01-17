import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="space-y-4 text-center max-sm:mt-11">
      <h1 class="text-white text-2xl max-sm:text-sm">IT'S DANGEROUS TO NOT KNOW THE WEATHER!</h1>
      <h3 class="text-white text-md max-sm:text-xs">Enter your location above or pick one of your previous saved locations.</h3>
    </div>
  )
});