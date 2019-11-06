import promise, { sum } from './demo13';

// console.log('1', sum);
//
// setTimeout(() => {
//   console.log('2', sum);
// }, 1000);

promise.then(() => {
  console.log('sum', sum);
});
