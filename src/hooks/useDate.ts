export default function useDate(time: string) {
  const date = new Date(time);
  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' });

  // todo : add 1ago 3ago until yesterday
  // const nowTime = new Date().getTime();
  // const diffTime = Math.abs(+date - nowTime);
  // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  // console.log(diffTime, diffDays);
  return `${day} ${month}`;
}
