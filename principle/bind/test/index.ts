import myBind from '../src';

console.log(Function.prototype.myBind === myBind);

const fn = function (this: any, ...args: any[]): any {
  console.log('this', this);
  return args;
};

const newFn = fn.myBind({ name: 'wk', age: 12 });
console.log('newFn', newFn(1, 2, 3, 4));

export {};
