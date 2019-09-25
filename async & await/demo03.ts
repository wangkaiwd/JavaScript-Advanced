Promise.resolve(Promise.reject(123))
  .then(res => console.log('res', res), err => console.log('err', err)); //err 123
