type ResolveFn = (value?: unknown) => void
type RejectFn = (value?: unknown) => void
class MyPromise {
  success: ResolveFn | undefined = undefined;
  fail: RejectFn | undefined = undefined;

  constructor (execute: (resolve: ResolveFn, reject: RejectFn) => void) {
    if (typeof execute !== 'function') {throw new Error('参数只能是函数');}
    execute(() => {
      // setTimeout会在then方法执行后再执行
      setTimeout(() => {
        this.success && this.success();
      });
    }, () => {
      setTimeout(() => {
        this.fail && this.fail();
      });
    });
  }

  then (success: ResolveFn, fail?: RejectFn) {
    this.success = success;
    this.fail = fail;
  }
}

export default MyPromise;
