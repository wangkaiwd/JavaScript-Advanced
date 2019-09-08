// ts 中不能对原型上的bind修改，所以我们写一个myBind来实现bind的功能
// @see: https://stackoverflow.com/questions/41773168/define-prototype-function-with-typescript?rq=1
// ts中文文档：https://www.tslang.cn/docs/handbook/declaration-merging.html
// ts英文文档：https://www.typescriptlang.org/docs/handbook/declaration-merging.htmlttype
type AnyFunction = (...args: any[]) => any
const myBind = function (this: AnyFunction, context: any, p1?: any, p2?: any) {
  return (): AnyFunction => {
    return this.call(context);
  };
};
Function.prototype.myBind = myBind;
export default myBind;
