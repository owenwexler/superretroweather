import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Spacer from "~/components/style/spacer";
import { GlobalStateContext } from "~/root";

import NoWeatherData from '../components/no-weather-data';
import WeatherContainer from "~/components/weather-container";
import type { IVCWeatherResponse } from "~/typedefs/IVCWeatherResponse";
import Loading from "~/components/loading";
import { getOfflineWeatherData } from "~/helper/getOfflineWeatherData";

export default component$(() => {
  const globalState = useContext(GlobalStateContext);

  //const typedCurrentWeatherData = globalState.currentWeatherData as unknown as IVCWeatherResponse;

  const typedCurrentWeatherData = getOfflineWeatherData()['Washington, DC'] as IVCWeatherResponse;

  return (
    <>
      <section class="flex min-h-screen flex-col items-center justify-start mt-10">
        <div class="flex h-screen w-4/6 max-sm:w-full max-sm:p-3 flex-col items-center justify-start py-9 max-sm:py-9 pb-10">
          <Spacer size={10} />
          <Spacer size={10} />
          <div class="md:hidden">
            <Spacer size={10} />
            <Spacer size={10} />
            <Spacer size={10} />
          </div>
          <div class="md:hidden">
            <Spacer size={10} />
            <Spacer size={10} />
            <Spacer size={10} />
          </div>
          <div class="md:hidden">
            <Spacer size={10} />
            <Spacer size={10} />
            <Spacer size={10} />
          </div>
          <div class="md:hidden">
            <Spacer size={10} />
            <Spacer size={10} />
            <Spacer size={10} />
          </div>
          {globalState.weatherDataIsLoading && <Loading />}
          {
            typedCurrentWeatherData
            ?
            <WeatherContainer
              weatherData={typedCurrentWeatherData}
              loading={globalState.weatherDataIsLoading}
              error={globalState.weatherDataIsErrored}
            />
            :
            <NoWeatherData />
          }
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
