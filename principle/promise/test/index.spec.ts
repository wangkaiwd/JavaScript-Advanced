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
  it('new Promise(fn) 会生成一个对象，对象有.then方法', () => {

  });
  it('new Promise(fn) 中传入的fn会立即执行', () => {

  });
});
