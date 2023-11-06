const getPicNameFromCondition = (condition: string) => {
  const conditions = {
    'Clear': 'clear.png',
    'Overcast': 'cloudy.png',
    'Rain': 'rain.png',
    'Partially cloudy' : 'partly-cloudy.png',
    'Snow': 'snow.png',
    'Thunderstorms': 'thunderstorm.png',
  }

  const typedCondition = condition as keyof typeof conditions;
  return conditions[typedCondition];
}

export {
  getPicNameFromCondition
}