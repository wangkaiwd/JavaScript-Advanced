interface Console {
  timeLog: (label?: string) => void
}
// const fn = async () => {
//   console.log(1);
//   await console.log(2);
//   console.log(3);
// };
// fn().then();
// console.log(4);

const getFoo = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 2000);
  });
};
const getBar = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('bar');
    }, 3000);
  });
};

const fn = async () => {
  const fooPromise = getFoo();
  const barPromise = getBar();
  console.time('await');
  const foo = await fooPromise;
  // @ts-ignore
  console.timeLog('await');
  console.log('1', foo);
  const bar = await barPromise;
  console.timeEnd('await');
  console.log('2', bar);
};
const fn1 = async () => {
  console.time('await1');
  const foo1 = await getFoo();
  // @ts-ignore
  console.timeLog('await1');
  console.log('3', foo1);

  const bar1 = await getBar();
  console.timeEnd('await1');
  console.log('4', bar1);
};
fn().then();
fn1().then();
export {};
