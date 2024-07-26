const splitCityAndState = (location: string): [string, string] => {
  const commaIndex = location.indexOf(',');
  const city = location.slice(0, commaIndex).trim();
  const state = location.slice(commaIndex + 1).trim();
  return [city, state];
}

export {
  splitCityAndState
}