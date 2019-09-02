## 函数
> 函数是`JavaScript`中的基本组件之一。一个函数是`JavaScript`过程--一组执行任务或计算值的语句

函数由一个或多个语句组成来完成特定任务。

在`JavaScript`中函数有很多相关的应用和技巧，下面我们通过一些例子(面试题)来一一学习。

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

### 函数式
数学中的函数： 每一个输入都会对应唯一一个输出
```text
f(x) = x/2
f(2) = 1
f(16) = 8
etc...
```

而在我们日常编程中用到的函数大多数是这样的：  
```js
let i = 1;
function f(n) {
  i++
  console.log(n+i)
}
f(1) // 3 
f(1) // 4
```

如果你的函数符合数学函数的定义，就是**函数式**的

而我们平常用到的都是编程里的子程序

### 函数的作用域

函数执行结果的影响因素：  
* 调用时传入的参数`params`
* 定义时环境的`env`([函数本身的作用域](https://javascript.ruanyifeng.com/grammar/function.html#toc11))

> 函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域

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

我们将上边的例子进行升级：  
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
这里我们在调用`f1`的时候传入了`f2`,然后在执行`f1`的时候执行`f2`。`f2`会在定义的位置进行作用域查询，它这时获取到的`a`为块级作用域中的`a`，`x`为全局作用域中的`x`。

### 闭包

闭包：如果在函数里面可以访问函数外面的变量，那么这个函数 + 这些变量 = 闭包

下面是一道最常见的面试题：  
```js
for (var i = 0; i < 6; i++) {
  setTimeout(() => {
    console.log(i);
  });
}
// 6 6 6 6 6 6
```
`var`声明的`i`在全局范围内都有效，所以全局只有一个变量`i`。所以最终在延时之后打印的`i`为全局`i`,这时循环已经执行完毕，`i`的值为6

解决上面问题的最简单的方法：  
```js
for (let i = 0; i < 6; i++) {
  setTimeout(() => {
    console.log(i);
  });
}
// 0 1 2 3 4 5
```

`let`声明的`i`只在本轮循环有效，所以每次循环的`i`其实都是一个新的变量，`setTimeout`中的函数会获取到当前循环中的`i`.而`JavaScript`引擎内部会记住上一轮循环的值，初始化本轮的变量`i`时，就在上一轮循环的基础上进行计算。

参考资料: [`let`基本用法](https://es6.ruanyifeng.com/#docs/let#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)

### `this`面试题

`this`是调用时的隐式的参数。

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
