// declaration merging：声明合并
// 类似于函数重载
// 这里声明的Function会和typescript已经定义好的Function进行类型合并，从而会支持自己新增的类型和原有的类型
interface Function {
  myBind: (context: object, ...args: any[]) => void
}

