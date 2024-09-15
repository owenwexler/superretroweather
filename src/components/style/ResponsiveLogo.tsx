import type { FC } from "preact/compat";
import ResponsiveLogoText from "./ResponsiveLogoText";

const ResponsiveLogo: FC = () => {
  return (
    <>
      <div id="responsive-logo-mobile" class="md:hidden">
        <a href="/">
          <ResponsiveLogoText id="responsive-logo-text-mobile">
            SuperRetroWeather
          </ResponsiveLogoText>
        </a>
      </div>
      <div id="responsive-logo-tablet" class="max-md:hidden">
        <a href="/">
          <ResponsiveLogoText id="responsive-logo-text-tablet">
            SuperRetroWeather
          </ResponsiveLogoText>
        </a>
      </div>
    </>
  )
}

export default ResponsiveLogo