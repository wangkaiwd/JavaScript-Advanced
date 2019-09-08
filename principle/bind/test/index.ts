import myBind from '../src';

console.log(Function.prototype.myBind === myBind);

const fn = function (this: any): any {
  console.log('this', this);
  return this;
};

const newFn = fn.myBind({ name: 'wk', age: 12 });
console.log('newFn', newFn());

export {};
