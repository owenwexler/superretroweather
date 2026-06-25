import React from 'react';
import { clickableText } from './style/twClasses/clickableTextClasses';

const OpenSourceStatement = () => {
  return (
    <div className="flex flex-col items-center align-center text-center py-5 px-3 space-y-2 mt-5">
      <h6 id="oss-statement" className="text-white text-sm max-sm:text-xs">
        SuperRetroWeather is a free open-source project made by Owen Wexler.
      </h6>
      <h6 id="oss-contribute" className="text-white text-sm max-sm:text-xs">
        To contribute, visit the <a href="https://github.com/owenwexler/superretroweather" id="oss-contribute-link" className={clickableText} target="_blank" rel="noopener noreferrer">Github</a> page, read the CONTRIBUTING.MD file, and make a pull request.
      </h6>
    </div>
  )
}

export default OpenSourceStatement;

