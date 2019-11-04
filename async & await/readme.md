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

下面是一个`Promise.all`成功的例子：
```typescript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  console.time('promiseTime');
  // @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%8F%82%E6%95%B0
  setTimeout(resolve, 1000, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(
  (values) => {
    console.timeEnd('promiseTime'); // promiseTime: 1004.001ms
    console.log('values', values); // [ 3 , 42, 'foo' ]
  }
);
```

我们再看一个`Promise.all`失败的例子：  
```typescript
// node的typescript类型声明文件没有定义这个借口
interface Console {
  timeLog: (label?: string) => void
}

const promise1 = Promise.resolve(3);
const promise3 = new Promise((resolve, reject) => {
  console.time('promiseTime');
  // @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%8F%82%E6%95%B0
  setTimeout(resolve, 1000, 'foo');
});
const promise4 = Promise.reject('reject');
Promise.all([promise1, promise3, promise4]).then(null, (reason) => {
  console.timeLog('promiseTime'); // promiseTime: 0.709ms
  console.log('reason', reason); // reason reject
});
```

根据`log`的时间可以判断，在`promise4`处于`rejected`状态时`Promise.all`的失败状态触发。

但我们可能想要知道哪些请求成功，哪些请求失败，并对请求成功和失败的结果分别进行处理。

`Promise`针对这个问题，提供了`Promise.allSettled`方法。还是上边的代码，我们用这个`api`重新执行：  
```js
Promise.allSettled([promise1, promise3, promise4]).then((results) => {
  console.timeLog('promiseTime'); // 1000.69384765625ms
  console.log('results', results);
  // [
  //    {status:"fulfilled",value:3},
  //    {status:"fulfilled",value: "foo"},
  //    {status:"rejected",reason: "reject"}
  // ]
});
```
但是这个方法的兼容性并不好，我们可以使用现有的`api`进行实现：  
```typescript
const promise1 = Promise.resolve(3);
const promise3 = new Promise((resolve, reject) => {
  console.time('promiseTime');
  // @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%8F%82%E6%95%B0
  setTimeout(resolve, 1000, 'foo');
});

const generateSuccessPromises = (promises: Promise<any>[]) => {
  return promises.map(promise => {
    return promise.then(
      (result) => ({ status: 'fulfilled', value: result }),
      (error) => ({ status: 'rejected', reason: error })
    );
  });
};

const promise4 = Promise.reject('reject');
const promises = generateSuccessPromises([promise1, promise3, promise4]);
Promise.all(promises).then((results) => {
  console.timeEnd('promiseTime');
  console.log('results', results);
});
```
这样我们就可以简单实现类似`Promise.allSettled`的功能，成功拿到每个`promise`的状态和对应的参数

#### `Promise.race`
`mdn`的介绍如下：  
> `Promise.race(iterable)`方法返回一个`promise`,一旦迭代器中的某个`promise`解决或拒绝，返回的`promise`就会解决或拒绝 

换句话说只要有一个`promise`完成，该方法就会返回对应状态的`promise`。下面是一个例子：  
```typescript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  console.time('promiseTime');
  // @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%8F%82%E6%95%B0
  setTimeout(resolve, 1000, 'foo');
});

const promise4 = Promise.reject('reject');

Promise.race([promise1, promise2, promise3]).then(
  (response) => {
    console.log('response', response); // response 3
  },
  (error) => {
    console.log('error', error);
  }
);
```

#### 面试题
串行，用点餐问题解决面试题

#### `Promise`错误处理

我们可以通过`.then`方法的第二参数来对`Promise`进行错误处理：  
```typescript
Promise.reject('error').then(null, (error) => {
  console.log(error); // error
});

Promise.reject('error').catch((error) => {
  console.log(error); // error
});
```
`.catch`方法与`.then(null, onRejected)`是相同的，只不过是`Promise`为错误处理单独提供的一个语法而已。

这里需要注意的是：**如果函数抛出错误或返回一个拒绝的`Promise`,`then`才会返回一个拒绝的`Promise`**
```typescript
Promise.reject('error')
  .catch((error) => {
    // 会返回一个成功状态的Promise
    return error;
  })
  .then((result) => {
    // result1 error
    console.log('result1', result);
  }, (error) => {
    // 不会执行
    console.log('error1', error);
  });

Promise.reject('error')
  .catch((error) => {
    // 会返回一个失败状态的Promise
    // Promise.reject(error)
    throw new Error(error);
  })
  .then((result) => {
    // 不会执行
    console.log('result2', result);
  }, (error) => {
    // error2 Error: error
    console.log('error2', error);
  });
```
#### 细节知识
> 这里对于一些不太常规的用法进行一下补充

在`Promise/A+`规范中有这样一句话：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/promise-then-argument-not-function.png)
这句话告诉我们，如果`then`方法中接收的参数不是函数，则必须必忽略。所以下面的参数都将无效：
```typescript
Promise.resolve(1).then(null)
Promise.resolve(1).then(undefined)
Promise.resolve(1).then(false)
Promise.resolve(1).then(123)
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/ts-promise-then-arguments-type.png)
在`TypeScript`中也有`then`参数的类型，分别支持函数、`null`、`undefined`。本文中的`then(null)`只是笔者习惯性写法

在`mdn`中还有如下介绍： 
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/promise-then-no-handle.png)

文档中的内容换句话说就是：**`then`中如果没有`Promise`对应状态的回调函数，那么`then`相当于无效，可以直接忽略**
```typescript
Promise.reject('error')
  .then()
  .then(null)
  .then(null, undefined)
  .then(null, (error) => {
    console.log('error', error);
  });

// 相当于
Promise.reject('error').then(null, (error) => {
  console.log('error', error);
});

Promise.resolve('success')
  .then()
  .then(null)
  .then(null, undefined)
  .then((result) => {
    console.log('result', result);
  });

// 相当于
Promise.resolve('success').then((result) => {
  console.log('result', result);
});
```
可以看到，中间没有对应状态的函数时，`Promise`就会当做什么都没发生一样继续执行后边的`.then`函数

### `async & await`基础用法
首先看一个最常见的例子：  
```typescript
const makePromise = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
};
const fn = async () => {
  const result = await makePromise();
  console.log('result', result); // result 100
  return result + 1;
};

fn().then();
```
通常情况下，我们会在`await`后面接一个`Promise`，之后的代码都会在`Promise`完成后再执行

这样写的好处是代码没有缩进，看起来比较简洁，就像写同步代码一样。我们再封装一个获取随机数的函数来进一步体验一下
```typescript
const getRandomNumber = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 6 + 1);
      if (Math.random() > 0.5) {
        resolve(random);
      } else {
        reject(random);
      }
    }, 3000);
  });
};

const fn = async () => {
  try {
    const n = await getRandomNumber();
    console.log(n);
  } catch (e) {
    console.log('error', e);
  }
};
fn().then();
```

在上面的代码中，我们通过`try catch`来进行错误处理，当我们想要在`try catch`外获取请求结果时，还会被块级作用域影响。类似的代码如下：
```typescript
interface RequestResult {
  name: string;
  age: number;
}
const fetchUser = () => {
  return new Promise<RequestResult>((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve({ name: 'wk', age: 12 });
    } else {
      reject('请求失败');
    }
  });
};

const getUser = async () => {
  // 想要在try catch之后使用user,要提升作用域
  let user;
  try {
    user = await fetchUser();
  } catch (e) {
    console.log('error', e);
  }
  console.log(user);
};
getUser().then();
```

更好的错误处理方式是通过`await`和`then`结合来实现：  
```typescript
const errorHandle = (e: Error) => {
  // 这里直接将错误抛出，否则就会返回一个新的promise被user接收到
  throw e;
};
// await 和 then结合
const getUser = async () => {
  const user = await fetchUser().then(null, errorHandle);
  console.log('user', user);
};
getUser().then();
```

### 代码题
页面有两个按钮A和B，以及一个输入框，A按钮点击后发送一个请求，返回一个字符串A，B也发送请求，但返回字符串B，返回后会把字符串赋值给输入框，但是A、B发送的俩个请求返回的时间不同，点击两个按钮的顺序也不一定，而最终效果要求是要输入框按照点击顺序进行展示按钮文字。

常见的需求场景：快速搜索俩个内容，要求不管请求完成的顺序如何，但是最终的展示的搜索内容为当时搜索的顺序。
