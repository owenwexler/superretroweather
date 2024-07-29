import { stateAbbreviations, stateNames } from '../data/staticLocationAndTimeData';
import { splitCityAndState } from "./splitCityAndState";

const hasAValidState = (location: string) => {
  const splitLocation = splitCityAndState(location);
  const state = splitLocation[1];
  return stateNames.includes(state) || stateAbbreviations.includes(state);
}

export {
  hasAValidState
}