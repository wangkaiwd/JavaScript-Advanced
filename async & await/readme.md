## `async & await`

### `Promise`

#### `Promise.resolve(result)`
制造一个成功或(失败)

```typescript
// 最终的状态是由resolve中传入的Promise决定的
Promise.resolve(Promise.reject(123))
  .then(res => console.log('res', res), err => console.log('err', err)); //err 123
```

#### `Promise.reject(reason)`
制造一个失败

#### `Promise.all`
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
