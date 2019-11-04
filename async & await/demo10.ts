Promise.reject('error')
  .then()
  .then(null)
  .then(null, undefined)
  .then(null, (error) => {
    console.log('error', error);
  });

// 相当于
Promise.reject('error').then(null, (error) => {
  console.log('error', error);
});

Promise.resolve('success')
  .then()
  .then(null)
  .then(null, undefined)
  .then((result) => {
    console.log('result', result);
  });

// 相当于
Promise.resolve('success').then((result) => {
  console.log('result', result);
});
