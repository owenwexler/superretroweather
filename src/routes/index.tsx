import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Spacer from "~/components/style/spacer";

export default component$(() => {
  return (
    <>
      <div class="flex flex-col items-center align-center justify-center bg-black space-y-6">
        <Spacer size={10} />
        <Spacer size={10} />
        <Spacer size={10} />
        <Spacer size={10} />
        <Spacer size={10} />
        <Spacer size={10} />
        <Spacer size={10} />
        <Spacer size={10} />
        <Spacer size={10} />
        <h1 class="text-white text-3xl">SuperRetroWeather</h1>
        <h3 class="text-white text-xl">It's dangerous to stay on outdated technology.</h3>
        <h3 class="text-white text-md">SuperRetroWeather is rebuilding.</h3>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "SuperRetroWeather",
  meta: [
    {
      name: "SuperRetroWeather - An 8-Bit Weather Site",
      content: "SuperRetroWeather - An 8-Bit Weather Site",
    },
  ],
};
