// 仅为副作用而导入一个模块的时候，必须这样写
// import '../src';
// 如果 myBind 没有被用到的话，就必须要写成 import "../src", 否则不会执行src/index.ts中的代码
import myBind from '../src';
import { assert } from 'chai';

Function.prototype.myBind = myBind;

describe('myBind', () => {
  Function.prototype.myBind = myBind;
  it('Function.prototype.myBind能用', () => {
    assert.notStrictEqual(Function.prototype.myBind, undefined);
  });
  it('this 绑定成功', () => {
    const fn = function (this: any) {
      return this;
    };
    const newFn = fn.myBind({ name: 'wk', age: 12 });
    // deepEqual: 相当于深拷贝
    // 例：俩个对象不指向同一个引用，但是它们的属性值相同
    assert.deepStrictEqual(newFn(), { name: 'wk', age: 12 });
  });
  it('p1,p2参数绑定成功', () => {
    const fn = function (this: any, p1: number, p2: number): any[] {
      return [this, 1, 2];
    };
    const context = { name: 'wk', age: 12 };
    const newFn = fn.myBind(context, 1, 2);
    assert.deepStrictEqual(newFn(), [context, 1, 2]);
  });
  it('先bind绑定this,返回函数传入p1,p2成功', () => {
    const fn = function (this: any, p1: number, p2: number): any[] {
      return [this, 1, 2];
    };
    const context = { name: 'wk', age: 12 };
    const newFn = fn.myBind(context);
    assert.deepStrictEqual(newFn(1, 2), [context, 1, 2]);
  });
  it('fn传入p1 p2,返回函数使用new执行时会自动p1 p2', () => {
    interface Props {
      p1: number;
      p2: number;
    }

    const fn1 = function (this: Props, p1: number, p2: number): void {
      this.p1 = p1;
      this.p2 = p2;
    };
    const fn2 = fn1.myBind(undefined, 1, 2);
    const object = new (fn2 as any)();
    assert.deepEqual(object, { p1: 1, p2: 2 });
  });
  it('new的时候绑定p1,p2,并且object是fn1的实例', () => {
    interface Props {
      p1: number;
      p2: number;
    }

    const fn1 = function (this: Props, p1: number, p2: number): void {
      this.p1 = p1;
      this.p2 = p2;
    };
    fn1.prototype.sayHi = function () {};
    const fn2 = fn1.myBind(undefined, 1, 2);
    const object = new (fn2 as any)();
    // isPrototypeOf: 方法用于测试一个对象是否存在于另一个对象的原型链上
    assert.isTrue(fn1.prototype.isPrototypeOf(object));
    assert.deepEqual(typeof object.sayHi, 'function');
  });
  it('不用new,但是用类似的对象', () => {
    interface Props {
      p1: number;
      p2: number;
    }

    const fn1 = function (this: Props, p1: number, p2: number): void {
      this.p1 = p1;
      this.p2 = p2;
    };
    const object1 = new (fn1 as any)('x', 'y');
    const fn2 = fn1.myBind(object1, 1, 2);
    const object2 = fn2();
    assert.isUndefined(object2);
    assert.strictEqual(object1.p1, 1);
    assert.strictEqual(object1.p2, 2);
  });
});
export {};
