## `Nodejs`基础架构
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/node-technology-architecture.png)
### `js`与`c++`进行通信
`Node.js bindings`: 让`js`和`C/C++`通信

自定义其它能力：`C/C++`插件

### `libuv`
跨平台的异步`I/O`库

`I/O`: 输入/输出

可以用于`TCP/UDP/DNS/`文件等的异步操作

### `V8`
`V8`不提供`DOM API`

`V8`本身是多线程

`V8`执行`JS`是单线程

### `EventLoop`
`EventLoop`就是对事件处理优先级顺序的管理：  
```javascript
// 定时器
setTimeout(f1,100)
// 文件读取成功
fs.readFile('/1.txt',f2)
// socket关闭
server.on('close',f3)
```
当定时器和事件都是`100ms`后执行时，执行时的优先级顺序就是`EventLoop`来进行处理的。

### 学习`api`
很好的学习`Node api`的网站： [DevDocs API Document](https://devdocs.io/)

常用`api`:
* Buffer
* Child Processes：子进程
* Cluster: 集群
* Debugger
* Events
* File System
* Globals
* HTTP
* Path
* Process: 进程
* Query Strings
* Stream: 流
* Timers
* URL
