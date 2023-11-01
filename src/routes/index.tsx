import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Spacer from "~/components/style/spacer";
import SrwInput from "~/components/style/srw-input";
import { getOfflineWeatherData } from "~/helper/getOfflineWeatherData";
import type { IOfflineWeatherDataLookup } from "~/typedefs/IOfflineWeatherData";

export default component$(() => {
  const offlineData: IOfflineWeatherDataLookup = getOfflineWeatherData();

  return (
    <>
      <section class="flex min-h-screen flex-col items-center justify-start mt-10">
        <div class="flex h-screen w-4/6 max-sm:w-full max-sm:p-3 flex-col items-center justify-start py-9 max-sm:py-9 pb-10">
          <Spacer size={10} />
          <Spacer size={10} />
          <div class="space-y-4 text-center">
            <h1 class="text-white text-3xl max-sm:text-sm">SuperRetroWeather</h1>
            <h3 class="text-white text-xl max-sm:text-xs">It's dangerous to stay on outdated technology.</h3>
            <h3 class="text-white text-md max-sm:text-xs">SuperRetroWeather is rebuilding.</h3>
            <p></p>
            <p class="text-white text-xs">{JSON.stringify(offlineData.dc.location.id ? offlineData.dc.location.id : {})}</p>
            <SrwInput
              inputId="test"
              inputPlaceholder="test"
            />
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
