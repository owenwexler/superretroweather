import type { TConditionImageType } from "../typedefs/TConditionImageType";

const getPicNameFromCondition = (condition: TConditionImageType) => {
  const conditions = {
    'clear': 'clear.png',
    'clear-day': 'clear.png',
    'clear-night': 'cloudy-night.png',
    'cloudy': 'cloudy-night.png',
    'overcast': 'cloudy-night.png',
    'rain': 'rain.png',
    'rain, overcast': 'rain.png',
    'rain, partially cloudy': 'rain.png',
    'partially cloudy' : 'partly-cloudy.png',
    'snow': 'snow.png',
    'snow, overcast': 'snow.png',
    'thunderstorms': 'thunderstorm.png',
    'partly-cloudy-day': 'partly-cloudy.png'
  }

  const typedCondition = condition.toLowerCase() as keyof typeof conditions;
  return conditions[typedCondition];
}

export {
  getPicNameFromCondition
}