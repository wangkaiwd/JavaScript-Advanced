## `async & await`
只要使用了`async`关键字，函数就会返回一个`Promise`，并且`await`后通常会接一个`Promise`来使用(否则没有意义)。

所以在理解`async & await`之前我们要先学习`Promise`
### `Promise`
首先看一个`Promise`基础的例子：  
```typescript
const randomNumber = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 6 + 1));
    }, 3000);
  });
};
```
使用上边例子中的函数：  
```typescript
randomNumber().then((n) => console.log(n)) // 随机1到6数字
```
#### `Promise.resolve(result)`
首先看一下`mdn`对于`Promise.resolve()`方法的定义：
> `Promise.resolve(value)`方法返回一个以给定值解析后的`Promise`对象。如果该值为`promise`,返回这个`Promise`

`Promise.resolve()`会返回一个成功的`Promise`
```typescript
Promise.resolve(4).then(res => console.log(res)); //4
```

值得注意的是，如果我们`resolve`一个失败状态的`Promise`，会返回一个失败的`Promise`
```typescript
// 最终的状态是由resolve中传入的Promise决定的
Promise.resolve(Promise.reject(123))
  .then(res => console.log('res', res), err => console.log('err', err)); //err 123
```

总结： 通常情况下`Promise.resolve`会返回一个成功状态的`Promise`，但是如果我们为`Promise.resolve`传入一个失败状态的`Promise`时会返回一个失败状态的`Promise`。

#### `Promise.reject(reason)`
`mdn`的描述如下：  
> `Promise.reject(reason)`方法返回一个带有拒绝原因`reason`参数的`Promise`对象

用法如下：  
```typescript
Promise.reject('failed').then(null, (reason) => {
  console.log('reason', reason); // 'reason failed'
});
```

#### `Promise.all`
`mdn`对于这个方法的描述如下：  
> `Promise.all(iterable)`方法返回一个`Promise`实例，此实例在`iterable`参数内所有的`Promise`都完成(`resolved`)或参数中不包含`promise`时回调完成(`resolve`);如果参数中`promise`有一个失败(`rejected`)，此实例回调失败(`reject`),失败原因是第一失败`promise`的结果。

将官方文档的内容整理一下，大概是这样一个意思： 
* `Promise.all`返回值是一个`Promise`实例
* 当传入的参数中的`promise`都处于`resolved`状态或者不包含`promise`时，该方法会返回一个成功状态的`promise`实例
* 如果传入参数中有一个`promise`变成失败(`rejected`)状态，那么该方法返回一个失败状态的`promise`实例，并且参数是第一个失败`promise`的失败原因

简单来说，所有传入的`promise`成功才会返回成功状态的`promise`，如果有一个`promise`失败的话就会返回失败状态的`promise`。


它是有问题的，我们想要的是`Promise.allSettled`

由于`Promise.allSettled`的兼容性并不好，我们可以简单实现下。

#### `Promise.race`
等待第一个状态改变

#### 面试题
串行，用点餐问题解决面试题



### `async & await`基础用法
优点：完全没有缩进，就像是在写同步代码。

错误处理:
```typescript
const fn2 = () => {
  return new Promise((resolve, reject) => {
    const randomRate = Math.random();
    if (randomRate > 0.5) {
      reject(new Error('error'));
    } else {
      resolve('success');
    }
  });
};
const errorHandler = (e: Error) => {
  console.log('error', e);
};
const fn3 = async () => {
  // 一般我们会在出错的时候希望不要影响之后的代码运行，并能对错误进行提示
  // 1. 不进行错误处理
  // 当await的Promise抛出异常时直接报错，不会执行后边的代码。
  // const response = await fn2();
  // console.log('response', response);

  // 2. 使用try catch
  // try {
  //   const response = await fn2();
  //   console.log('response', response);
  // } catch (e) {
  //   console.log('e', e);
  // }

  // 3. 使用Promise处理错误
  // 如果then中没有关于Promise对应状态的回调(比如这里传入null),那么then将创建一个新的没有经过回调函数处理的Promise
  // 这个新的Promise的最终状态为调用then方法的Promise的最终状态
  // 换句话说，如果then方法中没有Promise对应状态的处理，该then方法相当于不存在
  // .catch(errorHandler)相当于.then(undefined,errorHandler)
  // const response = await fn2().then(null, errorHandler);
  const response = await fn2().catch(errorHandler);
  console.log('response', response);

  console.log('fn3 end');
};
fn3();
```

`await & async`和`Promise`有异步传染性，回调没有传染性。

天生串行

在循环的时候会出现问题,`js`又出了一个新的语法来填坑(`for await`) 
```typescript

```

并行： `await Promise.all([promise1,promise2,promise3])`

### 代码题
页面有两个按钮A和B，以及一个输入框，A按钮点击后发送一个请求，返回一个字符串A，B也发送请求，但返回字符串B，返回后会把字符串赋值给输入框，但是A、B发送的俩个请求返回的时间不同，点击两个按钮的顺序也不一定，而最终效果要求是要输入框按照点击顺序进行展示按钮文字。

常见的需求场景：快速搜索俩个内容，要求不管请求完成的顺序如何，但是最终的展示的搜索内容为当时搜索的顺序。
