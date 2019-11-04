const makePromise = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
};
const fn = async () => {
  const result = await makePromise();
  console.log('result', result); // result 100
  return result + 1;
};

fn().then();
