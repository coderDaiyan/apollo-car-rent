export const timeToHour = (time: string) => {
  const hour = Number(time.split(':')[0]);
  const min = Number(time.split(':')[1]);
  const minsInHour = min / 60;
  return hour + minsInHour;
};
