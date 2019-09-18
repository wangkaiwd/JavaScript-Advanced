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

    const fn1 = function (this: any, p1: number, p2: number) {
      this.p1 = p1;
      this.p2 = p2;
    };
  });
});

const test5 = (message: string) => {
  console.log(message);
  const fn1 = function (this: any, p1: any, p2: any) {
    this.p1 = p1;
    this.p2 = p2;
  };
  const fn2 = fn1.myBind(undefined, 1, 2);
  const object = new (fn2 as any)();
  console.assert(object.p1 === 1);
  console.assert(object.p2 === 2);
};
const test6 = (message: string) => {
  console.log(message);
  const fn1 = function (this: any, p1: any, p2: any) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn1.prototype.sayHi = function () {};
  const fn2 = fn1.myBind(undefined, 1, 2);
  // FIXME:这里 new 会报错，暂时先将类型设置为any,因为没有找到更好的方法
  // @see: https://stackoverflow.com/questions/43623461/new-expression-whose-target-lacks-a-construct-signature-in-typescript
  const object = new (fn2 as any)();
  console.assert(object.p1 === 1, 'test6-p1');
  console.assert(object.p2 === 2, 'test6-p2');
  // __proto__从来没有被包括在EcmaScript语言规范中，但是现代浏览器都实现了它。它不被推荐使用
  // console.assert(object.__proto__ === fn1.prototype, 'test6-prototype');
  // fn1.prototype 对象是否存在于object的原型链上
  console.assert(fn1.prototype.isPrototypeOf(object), 'test6-prototype');
  console.assert(typeof object.sayHi === 'function', 'test6-function');
};
const test7 = (message: string) => {
  console.log(message);
  const fn1 = function (this: any, p1: any, p2: any) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn1.prototype.sayHi = function () {};
  const object1 = new (fn1 as any)('x', 'y');
  const fn2 = fn1.myBind(object1, 1, 2);
  const object2 = fn2();
  console.assert(object2 === undefined, 'object为空');
  console.assert(object1.p1 === 1);
  console.assert(object1.p2 === 2);
};

test5('fn.bind 传入p1,p2，通过new执行返回函数后实例上有p1和p2');
test6('new 的时候绑定p1,p2, 并且fn1有prototype.sayHi');
test7('不用new,但是用类似的对象');
export {};
