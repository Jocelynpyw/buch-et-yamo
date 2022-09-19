export const intlFormat: any = (num: number) =>
  new Intl.NumberFormat().format(Math.round(num * 10) / 10);

export const makeFriendly: any = (num: number) => {
  if (num >= 1000000) return `${intlFormat(num / 1000000)}M`;
  if (num >= 1000) return `${intlFormat(num / 1000)}k`;
  return intlFormat(num);
};
