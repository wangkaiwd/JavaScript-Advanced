## `EventLoop`
优秀博客: [深入理解`js`事件循环机制(`Node.js`篇)](http://lynnelv.github.io/js-event-loop-nodejs)

在`Node`的官方文档中有对这部分信息的详细介绍：[传送门](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)

这里可能会碰到一种情况：官方文档是英文的。

我们可以自己尝试翻译英文文档并分享出来，这样不仅可以让自己明白这个知识，还能分享给其他人。

### 官方文档知识整理

### 相关面试题
在我们执行异步代码的时候，浏览器到底做了些什么？

`NodeJs`和浏览器中是不一样的，`EventLoop`是`NodeJs`中的概念。

一道比较复杂的面试题:
