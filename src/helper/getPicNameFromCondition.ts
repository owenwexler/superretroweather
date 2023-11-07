const getPicNameFromCondition = (condition: string) => {
  const conditions = {
    'clear': 'clear.png',
    'clear-night': 'cloudy-night.png',
    'cloudy': 'cloudy-night.png',
    'overcast': 'cloudy-night.png',
    'rain': 'rain.png',
    'partially cloudy' : 'partly-cloudy.png',
    'snow': 'snow.png',
    'thunderstorms': 'thunderstorm.png',
  }

  const typedCondition = condition.toLowerCase() as keyof typeof conditions;
  return conditions[typedCondition];
}

export {
  getPicNameFromCondition
}