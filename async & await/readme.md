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
