// 仅为副作用而导入一个模块的时候，必须这样写
// import '../src';
// 如果 myBind 没有被用到的话，就必须要写成 import "../src", 否则不会执行src/index.ts中的代码
import myBind from '../src';

Function.prototype.myBind = myBind;

const test1 = (message: string) => {
  console.log(message);
  console.assert(Function.prototype.myBind !== undefined);
};
const test2 = (message: string) => {
  console.log(message);
  const fn = function (this: any) {
    return this;
  };
  const newFn = fn.myBind({ name: 'wk' });
  console.assert(newFn().name === 'wk');
};
const test3 = (message: string) => {
  console.log(message);
  const fn = function (p1: any, p2: any) {
    return [p1, p2];
  };
  const newFn = fn.myBind({ name: 'wk' }, 1, 2);
  const [p1, p2] = newFn();
  console.assert(p1 === 1, 'test3-p1');
  console.assert(p2 === 2, 'test3-p2');
};
const test4 = (message: string) => {
  console.log(message);
  const fn = function (p1: any, p2: any) {
    return [p1, p2];
  };
  const newFn = fn.myBind({ name: 'wk' });
  const [p1, p2] = newFn(1, 2);
  console.assert(p1 === 1, 'test4-p1');
  console.assert(p2 === 2, 'test4-p2');
};
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

test1('fn.bind 能用');
test2('this 绑定成功');
test3('参数p1,p2绑定成功');
test4('bind时传p1，之后调用时传p2成功');
test5('fn.bind 传入p1,p2，通过new执行返回函数后实例上有p1和p2');
test6('new 的时候绑定p1,p2, 并且fn1有prototype.sayHi');
test7('不用new,但是用类似的对象');
export {};
