export const delay = (delayTime: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), delayTime);
  });
};
