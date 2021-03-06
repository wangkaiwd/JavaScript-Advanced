// JSON支持的数据类型：object(普通对象), array(js中array属于object), string, number, boolean, null
// 凡是JSON不支持的类型，都不能使用JSON.parse(JSON.stringify())来进行序列化和反序列化

// js数据类型：String Number Boolean Null Undefined Symbol Object
// 目前新增：BigInt

// 环状结构：对象的某一个属性是自己，如: window.self === window // true

// 传入的类型和返回的类型应该相同
const deepClone = <T> (source: T): T => {
  let result: any = undefined;
  if (isPlainObject(source)) {
    result = {};
    for (const key in source) {
      // hasOwnProperty: 返回一个布尔值，指示对象自身属性中是否具有指定的属性
      // 这个方法可以用来检测一个对象是否含有特定的自身属性；和in运算符不同，该方法会忽略掉那些从原型链上继承到的属性
      if (source.hasOwnProperty(key)) { // for ... in 在遍历的时候会遍历对象原型上继承到的属性和方法
        // for in 遍历的时候会遍历
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
        result[key] = deepClone((source as any)[key]);
      }
    }
  } else if (isRegExp(source)) {
    result = new RegExp(source.source, source.flags);
  } else if (isDate(source)) {
    result = new Date(source);
  } else {
    result = source;
  }
  // for (const key in source) {
  //   if (source.hasOwnProperty(key)) {
  //     result[key] = deepClone(source[key]);
  //   }
  // }
  return result;
};

// 类型保护机制：类型谓词: parameterName is Type
const isPlainObject = (value: any): value is object => {
  return toString.call(value) === '[object Object]';
};

const isRegExp = (value: any): value is RegExp => {
  return toString.call(value) === '[object RegExp]';
};

const isDate = (value: any): value is Date => {
  return toString.call(value) === '[object Date]';
};
export default deepClone;
