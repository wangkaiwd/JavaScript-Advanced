## 手写`bind`
> `bind()`方法创建一个新的函数，在`bind()`被调用时，这个新函数的`this`被`bind`的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

`bind()`会返回一个指定`this`的函数，在执行该函数的时候会通过`call`调用执行`bind()`方法的函数，并将指定的`this`传入。

### `arguments`
`arguments`对象不是一个`Array`。它类似于`Array`，但除了`length`属性和索引元素之外没有任何`Array`属性。
### `polyfill`
