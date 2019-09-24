## `Promise`

### `executor`参数
* `Promise`构造函数执行时立即调用`executor`  
   即在`Promise`实例被创建的时候就会执行`executor`
* 如果在`executor`函数中抛出一个错误，那么该`promise`状态为`rejected`

### 方法
#### `Promise.all`
* 返回一个`Promise`实例
* 参数：`iterable`,一个可迭代对象，如`Array`或`String`
* 返回值情况：  
    * 参数中的所有`Promise`都完成：会将所有`Promise`的`resolve`结果作为数组返回
    * 参数中有一个`Promise`失败： 会将第一个`Promise`的失败结果作为`reject`的原因返回
    
下面是一个最简单的例子：  
```typescript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  // @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%8F%82%E6%95%B0
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(
  (values) => {
    console.log('values', values); // [ 3 , 42, 'foo' ]
  }
);
```

## `async & await`

### `async`关键字

在普通函数前使用关键字`async`就是会声明一个异步函数

相比于普通函数，异步函数总会返回一个`promise`。这是异步函数的特征之一：它将任何函数转换为`promise`

通过`TypeScript`我们可以更加清楚的看到异步函数返回值的类型
```typescript
// 异步函数声明
async function getHello1 (): Promise<string> {
  return 'Hello';
}

// 异步函数表达式：
const getHello2 = async function (): Promise<string> {
  return 'Hello';
};

// es6
const getHello3 = async (): Promise<string> => {
  return 'Hello';
};
```

