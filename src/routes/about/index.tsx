import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Spacer from "~/components/style/spacer";
import { GlobalStateContext } from "~/root";

export default component$(() => {

  const globalState = useContext(GlobalStateContext);

  console.log(globalState)

  return (
    <>
      <section class="flex min-h-screen flex-col items-center justify-start mt-10">
        <div class="flex h-screen w-4/6 max-sm:w-full max-sm:p-3 flex-col items-center justify-start py-9 max-sm:py-9 pb-10">
          <Spacer size={10} />
          <Spacer size={10} />
          <div class="space-y-4 text-center">
            <h1 class="text-white text-3xl max-sm:text-sm">SuperRetroWeather</h1>
            <h3 class="text-white text-xl max-sm:text-xs">ABOUT PAGE TO GO HERE.</h3>
          </div>
        </div>
      </section>
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