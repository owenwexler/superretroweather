import { component$, Slot, $, useContext } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Search from "~/components/search";
import ClickableText from "~/components/style/clickable-text";
import Navbar from "~/components/style/navbar";
import NavbarSection from "~/components/style/navbar-section";
import NavbarSeparator from "~/components/style/navbar-separator";
import ResponsiveLogo from "~/components/style/responsive-logo";
import SrwButton from "~/components/style/srw-button";

import { GlobalStateContext } from "~/root";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const globalState = useContext(GlobalStateContext);

  const hardcodedSavedLocations = ['Washington, DC', 'Dallas, TX', 'Virginia Beach, VA', 'Orlando, FL', 'Denver, CO'];

  const blankFunction = $(()=>{});

  const handleCityClick = $((text: string) => {
    globalState.currentCityText = text;
  })

  return (
    <>
      <Navbar>
        <NavbarSection>
          <ResponsiveLogo />
          <Search />
        </NavbarSection>
        <NavbarSeparator />
        <NavbarSection>
          {
            hardcodedSavedLocations.map(location => <ClickableText key={`clickable-text-${location}`} textId={`clickable-text-${location}`} text={location} clickFunction={$(() => handleCityClick(location))}/>)
          }
        </NavbarSection>
      </Navbar>
      <main>
        <Slot />
      </main>
    </>
  );
});
