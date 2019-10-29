const randomNumber = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 6 + 1));
    }, 3000);
  });
};

randomNumber().then(
  res => {
    console.log('log', res);
  }
);

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  // @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%8F%82%E6%95%B0
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(
  (values) => {
    console.log('values', values); // [ 3 , 42, 'foo' ]
  }
);

Promise.reject('failed').then(null, (reason) => {
  console.log('reason', reason); // 'reason failed'
});
