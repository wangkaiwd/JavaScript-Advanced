type ResolveFn = (value?: unknown) => void
type RejectFn = (value?: unknown) => void
class MyPromise {
  success: ResolveFn | undefined = undefined;
  fail: RejectFn | undefined = undefined;

  constructor (execute: (resolve: ResolveFn, reject: RejectFn) => void) {
    if (typeof execute !== 'function') throw new Error('参数只能是函数');
    const resolve = this.resolve.bind(this), reject = this.reject.bind(this);
    execute(resolve, reject);
  }

  resolve (value?: unknown): void {
    // setTimeout会在then方法执行后再执行
    setTimeout(() => {
      this.success && this.success();
    });
  }

  reject (value?: unknown): void {
    setTimeout(() => {
      this.fail && this.fail();
    });
  }

  then (success: ResolveFn, fail?: RejectFn) {
    this.success = success;
    this.fail = fail;
  }
}

export default MyPromise;
