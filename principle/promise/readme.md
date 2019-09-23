## 手写一个符合`A+`规范的`Promise`

> 参考资料
> * [`Promises/A+`](https://promisesaplus.com/)
> * [`Promises/A+` 中文翻译](https://juejin.im/post/5b6161e6f265da0f8145fb72)


### `Promise`的优点
* 通过链式的`.then`来减少回调函数的嵌套问题(减少缩进)
* 减少`if else`的使用(优雅),会分别传入成功回调和错误回调，不用再写`if(err){}`这样类似的代码
