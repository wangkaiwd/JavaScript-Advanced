class MyPromise {
  constructor (execute: (resolve: (value?: unknown) => void, reject: (value?: unknown) => void) => void) {
    if (typeof execute !== 'function') {throw new Error('参数只能是函数');}
  }
}

export default MyPromise;
