type AnyFunction = (...args: any[]) => any
const myBind = function (this: AnyFunction, thisArg?: any, ...args1: any[]) {
  const fn = this;

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
