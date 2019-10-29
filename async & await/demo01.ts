// node的typescript类型声明文件没有定义这个借口
interface Console {
  timeLog: (label?: string) => void
}
// const randomNumber = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(Math.floor(Math.random() * 6 + 1));
//     }, 3000);
//   });
// };
//
// randomNumber().then(
//   res => {
//     console.log('log', res);
//   }
// );

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  console.time('promiseTime');
  // @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%8F%82%E6%95%B0
  setTimeout(resolve, 1000, 'foo');
});

// Promise.all([promise1, promise2, promise3]).then(
//   (values) => {
//     console.timeEnd('promiseTime'); // promiseTime: 1004.001ms
//     console.log('values', values); // [ 3 , 42, 'foo' ]
//   }
// );
const promise4 = Promise.reject('reject');

Promise.all([promise1, promise3, promise4]).then(null, (reason) => {
  console.timeLog('promiseTime'); // promiseTime: 0.709ms
  console.log('reason', reason); // reason reject
});

// Promise.reject('failed').then(null, (reason) => {
//   console.log('reason', reason); // 'reason failed'
// });
