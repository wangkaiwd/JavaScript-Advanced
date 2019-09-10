// declaration merging：声明合并
// 类似于函数重载
// 这里声明的Function会和typescript已经定义好的Function进行类型合并，从而会支持自己新增的类型和原有的类型
type AnyFunction = (...args: any[]) => any

interface Function {
  // 剩余参数可以表示一个可以传入任意参数(参数类型和参数个数)的函数
  myBind: <T>(context?: any, ...args: T[]) => (AnyFunction),
  _bind: <T>(context?: any, ...args: T[]) => (AnyFunction)
}

