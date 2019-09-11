// 仅为副作用而导入一个模块的时候，必须这样写
// import '../src';
// 如果 myBind 没有被用到的话，就必须要写成 import "../src", 否则不会执行src/index.ts中的代码
import myBind from '../src';

Function.prototype.myBind = myBind;

const test1 = () => {
  const fn = function (this: any, ...args: any[]): any {
    console.log('this', this);
    return args;
  };

  const newFn = fn.myBind();
  console.log('newFn', newFn(1, 2, 3, 4));
};

const test2 = (message: string) => {
  const fn = function (this: any, p1: number, p2: number): void {
    this.p1 = p1;
    this.p2 = p2;
  };
  const fn1 = fn.myBind(undefined, 1, 2);
  const object = new (fn1 as any)();
  console.log('object', object.p1);
};
test2('new 的时候绑定了p1, p2');
export {};
