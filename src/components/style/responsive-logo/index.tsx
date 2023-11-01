import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <div id="responsive-logo-mobile" class="md:hidden">
        <h3 class="text-md text-white">
          SRW
        </h3>
      </div>
      <div id="responsive-logo-tablet" class="max-sm:hidden">
        <h3 class="text-xl text-white">
          SuperRetroWeather
        </h3>
      </div>
    </>
  )
});