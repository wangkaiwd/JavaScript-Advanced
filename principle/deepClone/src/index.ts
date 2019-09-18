// JSON支持的数据类型：object(普通对象), array(js中array属于object), string, number, boolean, null
// 凡是JSON不支持的类型，都不能使用JSON.parse(JSON.stringify())来进行序列化和反序列化

// js数据类型：String Number Boolean Null Undefined Symbol Object
// 目前新增：BigInt

// 传入的类型和返回的类型应该相同
const deepClone = <T> (source: T): T => {
  let result: any = undefined;
  if (isPlainObject(source)) {
    result = {};
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        console.log('0', result);
        result[key] = deepClone(source[key]);
      }
    }
  } else if (Array.isArray(source)) {
    result = [];
    source.forEach(item => {
      result.push(deepClone(item));
    });
  } else if (typeof source === 'function') {
    result = function (this: any) {
      return source.apply(this, arguments);
    };
    for (const key in source) {
      // result[key] = deepClone(source[key]);
      // result[key] = deepClone((source as any)[key]);
      if (source.hasOwnProperty(key)) {
        console.log('1', result);
        result[key] = deepClone((source as any)[key]);
      }
    }
  } else {
    result = source;
  }
  return result;
};

// 类型保护机制：类型谓词: parameterName is Type
const isPlainObject = (value: any): value is object => {
  return toString.call(value) === '[object Object]';
};

export default deepClone;
