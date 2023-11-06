const formatDateMMDDYY = (dateTime: string) => {
  const date = dateTime.slice(0, dateTime.indexOf('T'));
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
}

export {
  formatDateMMDDYY
}