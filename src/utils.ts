export const priceToKorean = (n: number): string => {
  if (n > 1000000000000) {
    return `${Math.round(n / 100000000000) / 10}조`;
  } else if (n > 100000000) {
    return `${Math.round(n / 100000000)}억`;
  } else {
    return `${Math.round(n / 10000)}만`;
  }
};
