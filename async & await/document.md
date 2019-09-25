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

#### `Promise.prototype.then`
分为以下几种情况：  
1. 返回一个值 `return value`，没有返回值默认会`return undefined`,将返回值作为成功状态的回调函数的参数。
2. `return Promise.resolve(value)`,返回一个`fulfilled`状态的`Promise`,将`resolve(value)`中的参数作为成功状态回调的参数
3. `then`中的回调函数抛出一个错误(`throw new Error`)，那么`then`返回的`Promise`将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值
4. `return Promise.reject(error)`,返回一个已经是拒绝状态的`Promise`, 那么`then`返回的`Promise`也会成为拒绝状态，并且将`reject`中的参数`error`作为该被返回`Promise`的拒绝状态的回调函数的参数值作为该被返回的`Promise`的拒绝状态回调函数的参数值
5. 返回一个未定状态的`Promise`

总结：**只要没有报错或者手动指定`Promise.reject()`,那么都会执行`.then`中的成功回调，参数为前一个`Promise`的返回值或`resolve`调用时的参数。如果前一个`Promise`报错或者执行`Promise.reject()`，那么会执行`.then`中的失败回调，参数为前一个`Promise`中的报错信息或者`reject`调用时的参数**



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

### `await`关键字
正常情况下，`await`命令后面是一个`Promise`对象，返回该对象的结果。如果不是`Promise`对象(不要这样写)，就直接返回对应的值。
```typescript
async function f () {
  // return await 123;
  // 等同于
  return 123;
}

f().then(r => console.log(r)); // 123
```

模拟`sleep`函数：  
```typescript
const sleep = () => new Promise((resolve, reject) => {
  const startDate = Date.now();
  setTimeout(() => resolve(Date.now() - startDate), 4000);
});

(async () => {
  // 只会阻塞函数内部代码的执行，并不会阻塞外部代码的执行
  const duration = await sleep();
  console.log('duration', duration);
})();
```

`await`命令后面的`Promise`对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数函数接收到，并且整个`async`函数都会中断执行。


