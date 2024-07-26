import { hours } from '../data/staticLocationAndTimeData';

const formatTime = (dateTime: string) => {
  const t = dateTime.indexOf('T');
  const time = dateTime.slice(t + 1, t + 6);
  const hour = Number(time.slice(0, 2));
  const minute = time.slice(time.indexOf(':') + 1);
  const suffix = hour > 12 ? 'PM' : 'AM';

  let formattedHour;

  if (hour > 12) {
    formattedHour = hours[hour as keyof typeof hours];
  } else {
    formattedHour = hour;
  }

  return `${formattedHour}:${minute}${suffix}`;
}

export {
  formatTime
}