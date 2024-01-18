import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="space-y-4 text-center p-3">
      <h1 class="text-white text-2xl max-sm:text-sm">I AM ERROR.</h1>
      <h3 class="text-white text-md max-sm:text-xs">Something has gone wrong.</h3>
      <h3 class="text-white text-md max-sm:text-xs">Please try again.</h3>
    </div>
  )
});