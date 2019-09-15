import MyPromise from '../src';
import { assert } from 'chai';

describe('MyPromise', () => {
  it('是一个类', () => {
    assert.isFunction(MyPromise);
    assert.isObject(MyPromise.prototype);
  });
  it('new Promise 必须接受一个函数', () => {
    // 直接调用会报错： assert.throw:断言函数执行将会报错
    assert.throw(() => {
      // @ts-ignore
      new MyPromise();
    });
  });
});
