import { component$,
  useStore,
  useContextProvider,
  createContextId,
  Signal,
} from "@builder.io/qwik";

import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,

} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

import type { ISRWGlobalState } from "./typedefs/ISRWGlobalState";

export const GlobalStateContext = createContextId<ISRWGlobalState>(
  'srw-global-state-context'
);

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  // TODO: is there a way we can not have context in the root component, or at least get most of it out via hooks or helper functions?  Investigate.
  const globalState: ISRWGlobalState = useStore({
    currentCityText: null,
    currentWeatherData: null,
    weatherDataIsLoading: false,
    weatherDataIeErrored: false,
    lastFiveCities: []
  })

  useContextProvider(GlobalStateContext, globalState);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
