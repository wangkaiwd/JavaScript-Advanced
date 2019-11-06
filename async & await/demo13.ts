let sum: number;
const getSum = async () => {
  const { add } = await import('./demo12');
  sum = add(1, 2);
};
export default getSum();
export { sum };

// const { add } = await import('./demo12');
// const sum = add(1, 2);
// export { sum };
