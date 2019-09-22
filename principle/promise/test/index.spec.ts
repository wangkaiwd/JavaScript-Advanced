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
  it('2.2.1', () => {
    const promise = new MyPromise((resolve) => {
      resolve();
    });
    promise.then(false, null);
    assert.strictEqual(1, 1);
  });
  it('2.2.2', (done) => {
    const success = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      assert.isFalse(success.called);
      resolve(233);
      resolve(344);
      setTimeout(() => {
        assert.strictEqual(promise.state, 'fulfilled');
        assert(success.calledWith(233));
        assert.isTrue(success.calledOnce);
        done();
      }, 0);
    });
    promise.then(success);
  });
  it('2.2.3', (done) => {
    const fail = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      assert.isFalse(fail.called);
      reject(233);
      reject(344);
      setTimeout(() => {
        assert.strictEqual(promise.state, 'rejected');
        assert(fail.calledWith(233));
        assert.isTrue(fail.calledOnce);
        done();
      }, 0);
    });
    // .then传入的参数不是函数都将被忽略
    promise.then(null, fail);
  });
  it('2.2.4 .then 中的函数会在用户代码执行完之后才执行', (done) => {
    const succeed = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    promise.then(succeed);
    assert.isFalse(succeed.called);
    setTimeout(() => {
      assert.isTrue(succeed.called);
      done();
    }, 0);
  });
  it('2.2.5 .then 中的函数在调用时this是undefined', () => {
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    promise.then(function (this: any) {
      'use strict';
      assert.strictEqual(this, undefined);
    });
  });
  it('2.2.6.1 同一个promise的then方法中的成功回调可以按照顺序调用多次', (done) => {
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
    callbacks.forEach(callback => promise.then(callback));
    setTimeout(() => {
      const [func1, func2, func3] = callbacks;
      assert.isTrue(func1.called);
      assert.isTrue(func2.calledAfter(func1));
      assert.isTrue(func3.calledAfter(func2));
      done();
    }, 0);
  });
  it('2.2.6.2 同一个promise的then方法中的失败回调可以按照顺序调用多次', (done) => {
    const promise = new MyPromise((resolve, reject) => {
      reject();
    });
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
    callbacks.forEach(callback => promise.then(null, callback));
    setTimeout(() => {
      const [func1, func2, func3] = callbacks;
      assert.isTrue(func1.called);
      assert.isTrue(func2.calledAfter(func1));
      assert.isTrue(func3.calledAfter(func2));
      done();
    }, 0);
  });
});

