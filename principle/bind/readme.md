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

由于我们用到了`TypeScript`,直接在`Function.prototype`上添加方法会报错，这里我们用到一个声明合并的概念。

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
  myBind: <T>(context: any, ...args: T[]) => (AnyFunction)
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

