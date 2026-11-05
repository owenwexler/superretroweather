import type { FC } from 'react';
import { srwTransparentButton } from './style/twClasses/buttonClasses';

// Used for unmatched URLs and for locations the weather API cannot find.  The copy riffs on the Super Mario Bros. castle line, matching the Zelda riff on the home page and "I AM ERROR." on the error page.
// Plain anchor instead of TanStack's Link so this also renders in the RTL tests, which have no router context.
const NotFound: FC = () => {
  return (
    <div className="space-y-4 text-center p-3 max-sm:mt-11">
      <h1 id="not-found-title" className="text-white text-2xl max-sm:text-lg">THANK YOU WEATHER HUNTER!</h1>
      <h3 id="not-found-message" className="text-white text-md max-sm:text-md">BUT THIS PAGE IS IN ANOTHER CASTLE!</h3>
      <a id="not-found-home-link" href="/" className={srwTransparentButton}>
        <span className="text-white text-md max-sm:text-sm">BACK TO HOME</span>
      </a>
    </div>
  )
}

export default NotFound;
