// JSON支持的数据类型：object(普通对象), array(js中array属于object), string, number, boolean, null
// 凡是JSON不支持的类型，都不能使用JSON.parse(JSON.stringify())来进行序列化和反序列化

// js数据类型：String Number Boolean Null Undefined Symbol Object
// 目前新增：BigInt

// 传入的类型和返回的类型应该相同
const deepClone = <T> (source: T): T => {
  const result: any = undefined;
  if (isPlainObject(source)) {
    for (const key in source) {
      result[key] = deepClone(source[key]);
    }
  }
  return result;
};

// 类型保护机制：类型谓词: parameterName is Type
const isPlainObject = (value: any): value is object => {
  return toString.call(value) === '[object Object]';
};

export default deepClone;
