import { component$ } from '@builder.io/qwik';
import ImgClear from '/public/images/istock/clear.png?jsx';

export default component$(() => {
  return (
    <div class="flex flex-col space-y-4 items-center justify-center text-center">
      <div class="flex flex-row space-x-3 items-center justify-center">
        <ImgClear class="animate-pulse w-[100px] h-100px]" />
        <h1 class="text-white text-3xl max-sm:text-sm animate-pulse">L O A D I N G</h1>
      </div>
    </div>
  )
});