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

```
