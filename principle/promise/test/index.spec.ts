import MyPromise from '../src';
import chai, { assert } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
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
  it('new Promise(fn) 中传入的fn会立即执行', () => {
    const fn = sinon.fake();
    const promise = new MyPromise(fn);
    assert(fn.called);
  });
  it('new Promise(fn) 中的fn执行的时候接受resolve和reject俩个函数', (done) => {
    // 这个测试用例即使没有执行execute函数也会通过，通过值行done()来表示测试用例结束
    new MyPromise((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done();
    });
  });
  it('new Promise(fn) 会生成一个对象，对象有.then方法', () => {
    const promise = new MyPromise(() => {});
    assert.isFunction(promise.then);
  });
  it('promise.then(success) 中的 success 会在resolve被调用的时候执行', (done) => {
    const success = sinon.fake();
    const promise = new MyPromise((resolve) => {
      resolve();
      setTimeout(() => {
        assert(success.called);
        done();
      });
    });
    promise.then(success);
  });
});
