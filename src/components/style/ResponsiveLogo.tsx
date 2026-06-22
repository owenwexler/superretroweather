import type { FC } from 'react';
import ResponsiveLogoText from './ResponsiveLogoText';

const ResponsiveLogo: FC = () => {
  return (
    <>
      <div id="responsive-logo-mobile" className="md:hidden">
        <a href="/">
          <ResponsiveLogoText id="responsive-logo-text-mobile">
            SuperRetroWeather
          </ResponsiveLogoText>
        </a>
      </div>
      <div id="responsive-logo-tablet" className="max-md:hidden">
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
