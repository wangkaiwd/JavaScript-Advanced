type ResolveFn = (result?: unknown) => void
type RejectFn = (reason?: unknown) => void
type PromiseState = 'pending' | 'fulfilled' | 'rejected'
class MyPromise {
  success: ResolveFn | undefined = undefined;
  fail: RejectFn | undefined = undefined;

  state: PromiseState = 'pending';

  constructor (execute: (resolve: ResolveFn, reject?: RejectFn) => void) {
    if (typeof execute !== 'function') throw new Error('参数只能是函数');
    const resolve = this.resolve.bind(this), reject = this.reject.bind(this);
    execute(resolve, reject);
  }

  resolve (result?: unknown): void {
    // setTimeout会在then方法执行后再执行
    setTimeout(() => {
      if (typeof this.success === 'function') {
        this.state = 'fulfilled';
        this.success(result);
      }
    });
  }

  reject (reason?: unknown): void {
    setTimeout(() => {
      if (typeof this.fail === 'function') {
        this.state = 'rejected';
        this.fail(reason);
      }
    });
  }

  then (success: any, fail?: any) {
    (typeof success === 'function') && (this.success = success);
    (typeof fail === 'function') && (this.fail = fail);
  }
}

export default MyPromise;
