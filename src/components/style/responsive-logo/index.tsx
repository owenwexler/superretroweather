import { component$ } from '@builder.io/qwik';
import ResponsiveLogoText from '../responsive-logo-text';
import { Link } from '@builder.io/qwik-city';


export default component$(() => {
  return (
    <>
      <div id="responsive-logo-mobile" class="md:hidden">
        <Link href="/">
          <ResponsiveLogoText textId="responsive-logo-text-mobile">
            SuperRetroWeather
          </ResponsiveLogoText>
        </Link>
      </div>
      <div id="responsive-logo-tablet" class="max-md:hidden">
        <Link href="/">
          <ResponsiveLogoText textId="responsive-logo-text-tablet">
            SuperRetroWeather
          </ResponsiveLogoText>
        </Link>
      </div>
    </>
  )
});