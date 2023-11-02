import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Search from "~/components/search";
import ClickableText from "~/components/style/clickable-text";
import Navbar from "~/components/style/navbar";
import NavbarSection from "~/components/style/navbar-section";
import NavbarSeparator from "~/components/style/navbar-separator";
import ResponsiveLogo from "~/components/style/responsive-logo";
import SrwButton from "~/components/style/srw-button";

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
  // const hardcodedSavedLocations = ['Washington, DC', 'Dallas, TX', 'Virginia Beach, VA', 'Orlando, FL', 'Denver, CO'];
  return (
    <>
      <Navbar>
        <NavbarSection>
          <ResponsiveLogo />
          <Search />
          <SrwButton buttonId="about-us-button">
            <p class="text-sm max-sm:text-xs text-white">ABOUT</p>
          </SrwButton>
        </NavbarSection>
        <NavbarSeparator />
        <NavbarSection>
          <ClickableText text="Washington, DC" />
          <ClickableText text="Dallas, TX" />
          <ClickableText text="Virginia Beach, VA" />
          <ClickableText text="Orlando, FL" />
          <ClickableText text="Denver, CO" />
            {/* {
            hardcodedSavedLocations.map(location => { <ClickableText text={location} />)
           } */}

        </NavbarSection>
      </Navbar>
      <main>
        <Slot />
      </main>
    </>
  );
});
