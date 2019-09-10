// ts 中不能对原型上的bind修改，所以我们写一个myBind来实现bind的功能
// @see: https://stackoverflow.com/questions/41773168/define-prototype-function-with-typescript?rq=1
// ts中文文档：https://www.tslang.cn/docs/handbook/declaration-merging.html
// ts英文文档：https://www.typescriptlang.org/docs/handbook/declaration-merging.htmlttype
type AnyFunction = (...args: any[]) => any
// context是可选参数，没有传入的话默认指向window
const myBind = function (this: AnyFunction, context?: any, ...args1: any[]) {
  // return (...args2: any[]): AnyFunction => {
  //   return this.call(context, ...args1, ...args2);
  // };
  // 这里的this是调用bind的函数
  const fn = this;
  return function (...args2: any[]): AnyFunction {
    // 由于不是箭头函数，这里还会有新的this
    return fn.call(context, ...args1, ...args2);
  };
};

Function.prototype.myBind = myBind;
export default myBind;

// es5 语法
const _bind = function (this: AnyFunction) {
  var slice = Array.prototype.slice,
    context: any = arguments[0],
    args1: any[] = slice.call(arguments, 1),
    fn = this;
  if (typeof fn !== 'function') throw new Error('只有函数才能调用bind!');
  return function () {
    var args2: any[] = slice.call(arguments);
    return fn.call(context, args1.concat(args2));
  };
};
Function.prototype._bind = _bind;
// const fn1 = function (this: any) {
//   return this;
// };
// const newFn1 = fn1._bind({ name: 'wk', age: 12 });
// console.log('newFn1', newFn1());
