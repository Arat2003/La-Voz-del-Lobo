export const sleep = (secs: number) =>
  new Promise((res) => setTimeout(res, secs * 1000));
