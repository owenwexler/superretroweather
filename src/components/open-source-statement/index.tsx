import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="flex flex-col items-center align-center text-center py-5 px-3 space-y-2">
      <h6 class="text-white text-sm">
        SuperRetroWeather is a free open-source project.
      </h6>
      <h6 class="text-white text-sm max-sm:text-xs">
        To contribute, visit our <a href="https://www.github.com" class="underline cursor-pointer" target="_blank" rel="noopener noreferrer">Github</a> page, read the CONTRIBUTING.MD file, and make a pull request.
      </h6>
    </div>
    )
});