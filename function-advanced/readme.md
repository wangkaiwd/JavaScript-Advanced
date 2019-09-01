## 函数
> 函数是`JavaScript`中的基本组件之一。一个函数是`JavaScript`过程--一组执行任务或计算值的语句

函数在编程中是用来执行一段代码，假设没有函数的话，我们的代码将会是一段一段，无法进行拆分优化。

在`JavaScript`中函数有很多相关的应用和技巧，下面让我们来一一学习。

### 函数的一些相关知识
首先我们需要先复习几个简单但是容易被忽略的几个知识点，这样可以更好的理解笔者接下来要讲述的内容。

实现一个打印函数参数个数的函数：  
```javascript
function f(a,b) {
  console.log(f.length);
  console.log(arguments.length);
}
f(1,2,3)
// 2
// 3
```

* `f.length`: 函数定义时的参数个数
* `arguments.length`: 函数调用时的参数个数

由于函数调用时可以多传参数的特性，**导致函数的参数的个数要分为执行时参数和定义时参数**

### 数学中的函数
传入同样的`x`一定会得到同样的`y`

`f(x) = y`

我们平常用到的是编程里的子函数

### 函数中的返回值由什么决定？
影响因素：  
* 调用时输入的参数`params`
* 定义时环境的`env`([函数本身的作用域](https://javascript.ruanyifeng.com/grammar/function.html#toc11))

> 函数的作用域是其声明时所在的作用域，与其运行时所在的作用域无关

我们看下面的一个例子：  
```js
let x = 'x';
let a = 1;

function f1 (x) {
  return x + a;
}

{
  let x = 'x';
  let a = 2;
  console.log(f1(x)); // "x1"
}
```
这里的`a`我们用到的是定义时的`a`,而不是执行时的`a`。

我们再看一个更加复杂的例子：  
```js
let x = 'x';
let a = 1;
function f1 (c) {
  c();
}
{
  let a = 2;
  function f2 () {
    console.log(x + a);
  }
  f1(f2); // 'x2'
}
```
这里我们在调用`f1`的时候传入了`f2`,然后在执行`f2`的时候执行`f1`。而函数内部用到的变量的作用域都是根据定义时的位置来获取的。

### 闭包

闭包：如果在函数里面可以访问函数外面的变量，那么这个函数 + 这些变量 = 闭包

### `this`面试题

将隐式`this`转换为显式`this`:  
```js
fn(1,2)
// fn.call(undefined, 1, 2)

obj.say('hi')
// obj.say.call(obj, 'hi')

array[0]('hi')
// array[0].call(array, 'hi')
```

#### 测试题
> 下边代码中`this`的会分别打印什么？

* 测试一
```js
button.onclick = function(e) {
  console.log(this);
}
```

* 测试二
```js
const vm = new Vue({
  data() {
    return {
      message: 'hi'    
    } 
  },
  methods: {
    sayHi(){
      console.log(this.message);
    }
  }
})
```
* 测试三
```js
let length = 10;
function fn() {
  console.log(this.length);
}
let obj = {
  length: 5,
  method(fn) {
    fn()
    arguments[0]()
  }
}
```

### 递归和调用栈
* 阶乘
* 斐波那契数

#### 递归优化
* 尾递归
* 记忆化函数

`JavaScript`中没有尾递归

用数组实现斐波那契数列：  
```js

```

通过记忆化函数来减少重复计算(`React`)：
* `memo`
* `useCallback`

### 柯理化
> 柯理化(英语:`Currying`)：是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数而且返回结果的新函数的技术

下面我们通过测试题来在代码层面理解柯理化
#### 面试题  

如何把三参函数`add(1,2,3)`变成`curriedAdd(1)(2)(3)`形式？
```js
const add = (a,b,c) => a + b + c

const curriedAdd = a => b => c => add(a,b,c) 
```

假设：  
* `addTwo` 接受俩个参数
* `addThree` 接受三个参数
* `addFour` 接受四个参数

请写出一个`currify`函数，使得它们分别接受2,3,4次参数,如：  
```js
currify(addTwo)(1)(2) // 3
currify(addThree)(1)(2)(3) // 6
currify(addFour)(1)(2)(3)(4) // 10
```

也就是说`currify`能将任意接受固定个参数的函数，变成单一参数的函数的层层调用

那如果我们传入的函数接受的参数并不固定，我们该怎么做？

### 高阶函数
```js
const bind = Function.prototype.bind
const apply = Function.prototype.apply
const call = Function.prototype.call
```
理解函数调用：  
* `bind.call`
* `apply.call`
* `call.call`

函数组合

由于函数组合写起来不是很方便，我们可以使用`Ramda.js`中的`compose`来优化写法

而在为未来的`JavaScript`语法中也可以通过`pipe`来更好的书写函数组合