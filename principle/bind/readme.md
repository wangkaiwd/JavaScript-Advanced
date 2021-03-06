## 手写`bind`
先看一下`mdn`对于`bind`的定义：

> `bind()`方法创建一个新的函数，在`bind()`被调用时，这个新函数的`this`被`bind`的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

`bind()`会返回一个指定`this`的函数，在执行该函数的时候会通过`call`调用执行`bind()`方法的函数，并将指定的`this`传入返回执行结果。

### `arguments`
想要实现`bind`的话，我们还需要了解一下`arguments`对象。

`arguments`对象不是一个`Array`。它类似于`Array`，但除了`length`属性和索引元素之外没有任何`Array`属性。

可以将`arguments`转换为：  
```javascript
// es5
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// es6
const args = Array.from(arguments);
const args = [...arguments];
```
### `TypeScript`声明合并
这里我们在通过在`Function`的原型上新添加一个`myBind`方法来实现`bind`方法对应的功能。

由于我们用到了`TypeScript`,直接在`Function.prototype`上添加方法会报错，这里我们用到声明合并的概念。

* [文档链接](https://www.tslang.cn/docs/handbook/declaration-merging.html)
* `stackoverflow`也有对应的解决方法： [define prototype function with typescript](https://stackoverflow.com/questions/41773168/define-prototype-function-with-typescript?rq=1)

具体做法如下：
  
首先根目录下新建`types/index.d.ts`用来类型声明：  
```typescript
// declaration merging：声明合并
// 类似于函数重载
// 这里声明的Function会和typescript已经定义好的Function进行类型合并，从而会支持自己新增的类型和原有的类型
type AnyFunction = (...args: any[]) => any
interface Function {
  // 剩余参数可以表示一个可以传入任意参数(参数类型和参数个数)的函数
  myBind: <T>(context?: any, ...args: T[]) => (AnyFunction)
}
```

之后我们要在`tsconfig.json`中设置`types`属性：  
```json
{
  "compilerOptions": {
    ...
    "types": [
       "./principle/types"
    ],
    ...
  }
}
```

这样写了之后，`TypeScript`会将我们定义的`Function`和`TypeScript`自己定义的`Function`接口里的属性和方法进行合并，之后我们就可以使用自己定义的`myBind`方法

### `es6`语法实现
我们先定义测试函数：  
```typescript
const fn = function (this: any, ...args: any[]): any {
  console.log('this', this);
  return args;
};
```
测试函数会打印执行时的`this`并且返回执行时传入的参数。

接下来我们使用`fn`调用`myBind`方法:  
```typescript
const newFn = fn.myBind({ name: 'wk', age: 12 });
console.log('newFn', newFn(1, 2, 3, 4));
```

我们期望的输出结果：  
```text
{ name: 'wk', age: 12 }
[1,2,3,4]
```

在了解需求后我们实现`bind`方法：  
```typescript
type AnyFunction = (...args: any[]) => any
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
```

### `bind`后的函数通过`new`命令执行
首先看下`new`的定义：  
> `new`运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

定义一个构造函数：  
```typescript
const Person = function (this: any, name: string, age: number) {
  this.name = name;
  this.age = age;
  this.sex = 'male';
};

const person = new (Person('wk', 12) as any);
```

`new`关键字会进行如下操作：  

1. 创建一个空的简单`JavaScript`对象(即`{}`)
2. 将这个空对象的原型指向构造函数的`prototype`属性
3. 将步骤1新创建的对象作为`this`的上下文
4. 执行构造函数内部的代码
5. 如果该函数没有返回对象，则返回`this`

使用代码来表示大概是这样(以上边的`Person`函数为例)：  
```javascript
// 1. 创建一个空的简单`JavaScript`对象(即`{}`)
const temp = {}
// 2. 将这个空对象的原型指向构造函数的`prototype`属性
temp.__proto__ = Person.prototype
// 3. 将步骤1新创建的对象作为`this`的上下文
this = temp
// 4. 执行构造函数内部的代码
this.name = name
this.age = age
this.sex = 'male'
// 5. 用户没有手动返回对象的话，默认返回this
return this
```

当我们对`bind`绑定过的函数使用`new`操作符时，原来提供的`this`就会被忽略，不过还是能提前传入调用时的参数列表：  
```javascript
var fn = function(a,b) {
  console.log('this',this);
  this.a = a
  this.b = b
}
var object = new (fn.bind({ name:'wk',age: 12 } ,2 ,3 ))

console.log('object',object);
// this {a:2, b:3}
// object {a:2, b:3}
```
下面是`mdn`中[`bind`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)作为构造函数使用的绑定函数的例子，笔者将其进行了整理，方便理解：
```javascript
// 创建构造函数Point
function Point(x, y) {
  this.x = x;
  this.y = y;
}

// 为构造函数的原型添加toString方法
Point.prototype.toString = function() { 
  return this.x + ',' + this.y; 
};

// 创建构造函数的实例，并调用toString方法
const p = new Point(1, 2);
p.toString(); // '1,2'

// 通过bind制定Point执行时的this=>window,第一个参数x=>0 
const YAxisPoint = Point.bind(window, 0);

// 通过new创建Point执行bind函数后返回值的实例，并为构造函数传入参数
const axisPoint = new YAxisPoint(5);
// 调用实例的toString方法，尽管bind将this => window,但是this还是指向了实例
axisPoint.toString(); // '0,5'

// instanceof: 实例进行原型链查找时可能会查找的原型的所属类即为true
axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
```

根据`new`关键字的作用以及`bind`结合`new`关键字使用的例子我们可以得到如下结论：  
* `bind`中绑定的`this`不会生效，还会使用调用`bind`的函数中的`this`
* 在`bind`绑定时可以提前传入构造函数中需要的参数

那么当对`bind`后的函数是否执行`new`关键字时的判断如下：  
```typescript
type AnyFunction = (...args: any[]) => any
const myBind = function (this: AnyFunction, context?: any, ...args1: any[]) {
  const fn = this;

  function resultFn (this: any, ...args2: any[]): AnyFunction {
    // instanceof: 用于测试构造函数的prototype属性是否出现在对象的原型链上的任何位置
    const isUseNew = this instanceof resultFn;
    return fn.call(isUseNew ? this : context, ...args1, ...args2);
  };
  // 将添加到fn原型对象上的方法赋值到resultFn的原型上
  // 原型链的查找过程如下: instance -> resultFn.prototype => fn.prototype => Object.prototype => null
  resultFn.prototype = Object.create(fn.prototype);
  return resultFn;
};
```
我们通过`instanceof`来判断函数是否在执行时使用了`new`，并且将`fn`的原型赋值到`resultFn`的原型上

到这里我们实现了一个支持`new`操作符的`bind`方法：  
```typescript
type AnyFunction = (...args: any[]) => any
// context是可选参数，没有传入的话默认指向window
const myBind = function (this: AnyFunction, context?: any, ...args1: any[]) {
  // return (...args2: any[]): AnyFunction => {
  //   return this.call(context, ...args1, ...args2);
  // };
  if (typeof this !== 'function') throw new Error('只能使用函数来调用bind');
  // 这里的this是调用bind的函数
  const fn = this;

  function resultFn (this: any, ...args2: any[]): AnyFunction {
    // 由于不是箭头函数，这里还会有新的this
    // const isUseNew = this.__proto__ === resultFn.prototype; // mdn不推荐使用__proto__
    // 说明返回的resultFn被当做new的构造函数调用
    // instanceof: 用于测试构造函数的prototype属性是否出现在对象的原型链上的任何位置
    const isUseNew = this instanceof resultFn;
    // 也可以这样写
    // isPrototypeOf: 用于测试一个对象是否存在于另一个对象的原型链上
    // resultFn.prototype 是否存在于this的原型链上
    // const isUserNew = resultFn.prototype.isPrototypeOf(this)
    return fn.call(isUseNew ? this : context, ...args1, ...args2);
  };
  // 在使用bind的时候，我们是将fn来作为构造函数的，并且在fn.prototype上绑定方法
  // 而我们最终在使用的时候，却是使用resultFn来作为构造函数的，然后将this传入到fn,
  // fn会帮我们将参数绑定到this上，但是不会帮我们绑定prototype,因为fn中的this现在已经指定了是外部的this
  resultFn.prototype = Object.create(fn.prototype);
  return resultFn;
};
```

### 兼容旧语法
上边版本的`bind`方法用到了很多新语法，而在有些浏览器并不能很好的兼容这些语法。

为了提高代码的兼容性，我们使用`es5`的相关`api`来实现`bind`，修改内容如下：
  
* `const => var`
* 用`arguments`来代替剩余参数`...args`
* 用`concat`来拼接数组

修改之后的代码如下：  
```typescript
// es5 语法
type AnyFunction = (...args: any[]) => any
const _bind = function (this: AnyFunction) {
  // 缓存Array原型上的slice
  var slice = Array.prototype.slice,
    context: any = arguments[0],
    // 将arguments通过slice转换为一个真数组
    args1: any[] = slice.call(arguments, 1),
    fn = this;
  if (typeof fn !== 'function') throw new Error('只有函数才能调用bind!');

  function resultFn (this: any) {
    var args2: any[] = slice.call(arguments);
    const isUseNew = this instanceof resultFn;
    return fn.apply(isUseNew ? this : context, args1.concat(args2));
  };
  resultFn.prototype = Object.create(fn.prototype);
  return resultFn;
};
```
这里我们实现了一个兼容性较好的版本。

在`mdn`里也有对于`bind`的实现代码，下面是其实现代码：
```javascript
if (!Function.prototype.bind) (function(){
  // 缓存数组原型上的slice方法
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function(otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    // 获取调用bind函数时时的除第一个参数的剩余所有参数
    var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this, // 缓存fToBind，方便之后调用
        fNOP    = function() {},
        fBound  = function() {
          // bind中传入的除this外的剩余参数的长度
          baseArgs.length = baseArgsLength; // reset to default base arguments
          // 将返回函数的参数放入到调用bind的参数(除this)中
          baseArgs.push.apply(baseArgs, arguments);
          // this 的原型链中含有fNOP的原型，说明对fBound使用了new关键字
          // 当使用new关键字的时候要忽略bing指定的this
          return fToBind.apply(
                 fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
          );
        };
    // 在调用bind方法时，会将调用bind函数的原型指向fNOP的原型
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    // 将fBound.prototype的原型指向fNOP的proptotype
    // 即 fBound.prototype.__proto__ = fNOP.prototype
    // 所以原型链查找会多一级
    // instance => fBound.prototype => fNOP.prototype
    // 这里相当于 fBound.prototype = Object.create(fNOP.prototype)
    fBound.prototype = new fNOP();

    return fBound;
  };
})();
```

如果使用`new`关键字执行`bind`绑定后的函数的话，其实相当于在`bind`内部实现`fBound`对`fToBind`构造函数的继承：
```javascript
function fToBind(x,y) {
  this.x = x;
  this.y = y;
}  
fToBind.prototype.say = function (){
  console.log('say',this.x,this.y)
};
function fNOP() {
  
}
fNOP.prototype = fToBind.prototype
function fBound(){
  // 首先继承其私有属性
  // 返回undefined会忽略，new会帮我们返回this
  return fToBind.apply(this,arguments)  
}

// fBound.prototype 是 fNOP的实例，可以获取它的方法
// new fNOP会返回一个新的对象，并将原型指向了fToBind
fBound.prototype = new fNOP()
fBoudn.prototype.constructor = fBound
// 这里fBound为其原型添加的属性，都在fBound.prototype自身属性上，不会修改fNOP.prototype的内容
```
其实`Object.create`也为我们做了同样的事情，下面我们结合上面的代码模拟实现一个`Object.create`方法：
```javascript
// 用指定的原型创建一个新对象
function create (proto) {
  function Fn () {}
  
  Fn.prototype = proto;
  return new Fn();
}
const obj = create(Array.prototype);
// obj.__proto__ === Array.prototype
```
`mdn`中对于`bind`的实现会涉及到`this`指向、`apply`方法、原型和原型链等相关的知识，希望上边的代码分析能让大家对这些知识有更深入的理解。

### 通过测试用例
为了保证代码的准确性，要通过一些测试用例来测试代码。

测试测试环境配置教程点击这里： [传送门](https://github.com/wangkaiwd/JavaScript-Advanced/blob/master/testconfig.md)

测试代码如下：  
```typescript
// 仅为副作用而导入一个模块的时候，必须这样写
// import '../src';
// 如果 myBind 没有被用到的话，就必须要写成 import "../src", 否则不会执行src/index.ts中的代码
import myBind from '../src';
import { assert } from 'chai';

Function.prototype.myBind = myBind;

describe('myBind', () => {
  Function.prototype.myBind = myBind;
  it('Function.prototype.myBind能用', () => {
    assert.notStrictEqual(Function.prototype.myBind, undefined);
  });
  it('this 绑定成功', () => {
    const fn = function (this: any) {
      return this;
    };
    const newFn = fn.myBind({ name: 'wk', age: 12 });
    // deepEqual: 相当于深拷贝
    // 例：俩个对象不指向同一个引用，但是它们的属性值相同
    assert.deepStrictEqual(newFn(), { name: 'wk', age: 12 });
  });
  it('p1,p2参数绑定成功', () => {
    const fn = function (this: any, p1: number, p2: number): any[] {
      return [this, 1, 2];
    };
    const context = { name: 'wk', age: 12 };
    const newFn = fn.myBind(context, 1, 2);
    assert.deepStrictEqual(newFn(), [context, 1, 2]);
  });
  it('先bind绑定this,返回函数传入p1,p2成功', () => {
    const fn = function (this: any, p1: number, p2: number): any[] {
      return [this, 1, 2];
    };
    const context = { name: 'wk', age: 12 };
    const newFn = fn.myBind(context);
    assert.deepStrictEqual(newFn(1, 2), [context, 1, 2]);
  });
  it('fn传入p1 p2,返回函数使用new执行时会自动p1 p2', () => {
    interface Props {
      p1: number;
      p2: number;
    }

    const fn1 = function (this: Props, p1: number, p2: number): void {
      this.p1 = p1;
      this.p2 = p2;
    };
    const fn2 = fn1.myBind(undefined, 1, 2);
    const object = new (fn2 as any)();
    assert.deepEqual(object, { p1: 1, p2: 2 });
  });
  it('new的时候绑定p1,p2,并且object是fn1的实例', () => {
    interface Props {
      p1: number;
      p2: number;
    }

    const fn1 = function (this: Props, p1: number, p2: number): void {
      this.p1 = p1;
      this.p2 = p2;
    };
    fn1.prototype.sayHi = function () {};
    const fn2 = fn1.myBind(undefined, 1, 2);
    const object = new (fn2 as any)();
    // isPrototypeOf: 方法用于测试一个对象是否存在于另一个对象的原型链上
    assert.isTrue(fn1.prototype.isPrototypeOf(object));
    assert.deepEqual(typeof object.sayHi, 'function');
  });
  it('不用new,但是用类似的对象', () => {
    interface Props {
      p1: number;
      p2: number;
    }

    const fn1 = function (this: Props, p1: number, p2: number): void {
      this.p1 = p1;
      this.p2 = p2;
    };
    const object1 = new (fn1 as any)('x', 'y');
    const fn2 = fn1.myBind(object1, 1, 2);
    const object2 = fn2();
    assert.isUndefined(object2);
    assert.strictEqual(object1.p1, 1);
    assert.strictEqual(object1.p2, 2);
  });
});
```

执行`bind`函数的相关测试用例：  
```shell script
yarn test -g "myBind"
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/pass-bind-test-case.png)

这里为止，我们基本上已经完成了一个功能完善的`bind`函数。

源码地址在这里： [传送门](https://github.com/wangkaiwd/JavaScript-Advanced/blob/master/principle/bind/src/index.ts)

如果文章对你有用的话，希望能`star`给予鼓励，让社区中乐于分享的开发者创造出更好的作品。
