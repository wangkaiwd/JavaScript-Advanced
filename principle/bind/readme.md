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

Function.prototype.myBind = myBind;
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
2. 链接该对象(即设置该对象的构造函数)到另一个对象
3. 将步骤1新创建的对象作为`this`的上下文
4. 如果该函数没有返回对象，则返回`this`

使用代码来表示大概是这样(以上边的`Person`函数为例)：  
```javascript
// 1. 创建一个空的简单`JavaScript`对象(即`{}`)
const temp = {}
// 2. 链接该对象(即设置该对象的构造函数)到另一个对象
temp.__proto__ = Person.prototype
// 3. 将步骤1新创建的对象作为`this`的上下文
this = temp
// 为this指定属性
this.name = name
this.age = age
this.sex = 'male'
// 用户没有手动返回对象的话，默认返回this
return this
```

当我们对`bind`绑定过的函数使用`new`操作符时，原来提供的`this`就会被忽略，不过提供的参数列表仍然会插入到构造函数调用时的参数列表之前：  
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
