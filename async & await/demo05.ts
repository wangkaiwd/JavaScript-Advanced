const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  console.time('promiseTime');
  // @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%8F%82%E6%95%B0
  setTimeout(resolve, 1000, 'foo');
});

const promise4 = Promise.reject('reject');

Promise.race([promise1, promise2, promise3]).then(
  (response) => {
    console.log('response', response); // response 3
  },
  (error) => {
    console.log('error', error);
  }
);

Promise.reject('error').then(null, (error) => {
  console.log(error); // error
});

Promise.reject('error').catch((error) => {
  console.log(error); // error
});

export {};
