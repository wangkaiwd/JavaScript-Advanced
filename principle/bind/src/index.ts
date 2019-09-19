type AnyFunction = (...args: any[]) => any
const myBind = function (this: AnyFunction, thisArg?: any, ...args1: any[]) {
  const fn = this;
  if (typeof fn !== 'function') throw new Error('请用函数调用bind');

  function resultFn (this: any, ...args2: any[]) {
    // new :
    // 1. temp = {}
    // 2. temp.__proto__ = resultFn.prototype
    // 3. this = temp 4. execute resultFn
    // 5. return this(no other object is returned)
    const isUseNew = this instanceof resultFn;
    return fn.call(isUseNew ? this : thisArg, ...args1, ...args2);
  };
  resultFn.prototype = fn.prototype;
  return resultFn;
};

export default myBind;

function _bind (this: AnyFunction) {
  var slice = Array.prototype.slice;
  var context = arguments[0];
  var fn = this;
  if (typeof fn !== 'function') throw new Error('请用函数调用bind');
  var arg1 = slice.call(arguments, 1);

  function resultFn (this: any) {
    var arg2 = slice.call(arguments);
    var isUseNew = this instanceof resultFn;
    return fn.apply(isUseNew ? this : context, arg1.concat(arg2));
  }

  resultFn.prototype = fn.prototype;
  return resultFn;
}

export { _bind } ;
