let sum: number;
const getSum = async () => {
  const { add } = await import('./demo12');
  sum = add(1, 2);
};
export default getSum();
export { sum };
