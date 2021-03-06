const stateNames = [
  'Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
];

const stateAbbreviations = [
  'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
  'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
  'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
  'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
  'VT','VI','VA','WA','WV','WI','WY'
 ];

 const hours = {
   13: 1,
   14: 2,
   15: 3,
   16: 4,
   17: 5,
   18: 6,
   19: 7,
   20: 8,
   21: 9,
   22: 10,
   23: 11,
   24: 12
 }

const separateCityAndState = (locString) => {
  const commaIndex = locString.indexOf(',');
  const city = locString.slice(0, commaIndex).trim();
  const state = locString.slice(commaIndex + 1).trim();
  return [city, state];
}

const hasAValidState = (locString) => {
  const [city, state] = separateCityAndState(locString);
  return stateNames.includes(state) || stateAbbreviations.includes(state);
}

const convertLocationStringToQuery = (locString) => {
  const [city, state] = separateCityAndState(locString);
  return `${city.replace(/ /g, '%20')}%2C%20${state.replace(/ /g, '%20')}`;
}

const formatDateMMDDYY = (dateTime) => {
  const date = dateTime.slice(0, dateTime.indexOf('T'));
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
}

const formatTime = (dateTime) => {
  const t = dateTime.indexOf('T');
  const time = dateTime.slice(t + 1, t + 6);
  const hour = Number(time.slice(0, 2));
  const minute = time.slice(time.indexOf(':') + 1);
  const suffix = hour > 12 ? 'PM' : 'AM';

  let formattedHour;

  if (hour > 12) {
    formattedHour = hours[hour];
  } else {
    formattedHour = hour;
  }

  return `${formattedHour}:${minute}${suffix}`;
}


const getPicNameFromCondition = (condition) => {
  if (condition === 'Clear') {
    return 'clear.png';
  } else if (condition === 'Overcast') {
    return 'cloudy.png';
  } else if (condition === 'Rain' || condition.includes('Rain')) {
    return 'rain.png';
  } else if (condition === 'Partially cloudy') {
    return 'partly-cloudy.png';
  } else if (condition === 'Snow') {
    return 'snow.png';
  } else if (condition === 'Thunderstorms')  {
    return 'thunderstorm.png';
  }
}

export {
  hasAValidState,
  convertLocationStringToQuery,
  formatDateMMDDYY,
  formatTime,
  getPicNameFromCondition
}