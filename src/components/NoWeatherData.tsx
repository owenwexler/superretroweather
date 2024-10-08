import type { FC } from 'preact/compat';

const NoWeatherData: FC = () => {
  return (
    <div className="space-y-4 text-center p-3 max-sm:mt-11">
      <h1 id="default-msg-its-dangerous" className="text-white text-2xl max-sm:text-lg">IT'S DANGEROUS TO NOT KNOW THE WEATHER!</h1>
      <h3 id="default-msg-enter-your-location" className="text-white text-md max-sm:text-md">Enter your location above or pick one of your previous saved locations.</h3>
    </div>
  )
}

export default NoWeatherData;