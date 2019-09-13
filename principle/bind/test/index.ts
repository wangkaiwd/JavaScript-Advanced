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

};
const test7 = (message: string) => {
  const fn = function (this: any, p1: number, p2: number): void {
    this.p1 = p1;
    this.p2 = p2;
  };
  const fn1 = fn.myBind(undefined, 1, 2);
  // FIXME:这里 new 会报错，暂时先将类型设置为any,因为没有找到更好的方法
  // @see: https://stackoverflow.com/questions/43623461/new-expression-whose-target-lacks-a-construct-signature-in-typescript
  const object = new (fn1 as any)();
  console.log('object', object);
};
test1('fn.bind 能用');
test2('this 绑定成功');
test7('new 的时候绑定了p1, p2');
export {};
