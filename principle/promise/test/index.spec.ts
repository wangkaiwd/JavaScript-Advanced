import MyPromise from '../src';
import { assert } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

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
    let called = false;
    const promise = new MyPromise((resolve, reject) => {
      called = true;
    });
    assert.isTrue(called);
  });
  it('new Promise(fn) 中的fn执行的时候接受resolve和reject俩个函数', () => {
    const promise = new MyPromise((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
    });
  });
  it('new Promise(fn) 会生成一个对象，对象有.then方法', () => {
    const promise = new MyPromise(() => {});
    assert.isFunction(promise.then);
  });
  it('promise.then(success) 中的 success 会在resolve被调用的时候执行', (done) => {
    let called = false;
    const promise = new MyPromise((resolve, reject) => {
      resolve();
      setTimeout(() => {
        assert.isTrue(called);
        done();
      });
    });
    promise.then(() => {
      called = true;
    });
  });
  // it('', function () {
  //
  // });
});
