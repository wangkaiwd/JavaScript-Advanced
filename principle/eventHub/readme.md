## 实现`eventHub`
> 这里会用`TypeScript`来实现对应的功能，如果有小伙伴不熟悉的话可以去官网查看基础语法：[基础类型](https://www.tslang.cn/docs/handbook/basic-types.html)

### 什么是`eventHub`
我们先看一段`dom`操作的代码：  
```js
const ele = document.getElementById('selector')
ele.addEventListener('click',() => console.log('click'))
// 可以订阅多个相同事件
ele.addEventListener('click',() => console.log('click2'))
// 可以取消订阅，这里必须要使用具名函数
ele.removeEventListener('click',handler)
```
上边的代码其实就是发布订阅模式，我们可以订阅`DOM`元素的一些事件，当用户执行相应的操作时会发布事件。当然我们也可以手动来取消对事件的订阅。

不仅仅在操作`DOM`的时候我们会用到发布订阅模式，在`vue`中我们使用自定义事件的时候也会应用到发布订阅模式：  
```vue
<!--父组件-->
<my-component v-on:my-event="doSomething"></my-component>

// MyComponent组件
methods: {
  fn() {
    this.$emit('my-event',data)
  }
}
```

### 自己实现`eventHub`
在了解了`eventHub`之后，我们来自己实现一下

代码编写思路如下：
* 确定`api`
* 测试代码(`TDD`)
* 通过测试
* 重构之前的代码

`eventHub`的`api`如下：  
```text
eventHub.on()   // 订阅
eventHub.emit() // 发布
eventHub.off()  // 取消订阅
```

根据需求我们可以编写如下测试代码：  

```typescript
import EventHub from '../src/index';

const test1 = (message: string): void => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object);
  console.log(message);
};

const test2 = (message: string): void => {
  const eventHub = new EventHub();
  let called = false;
  eventHub.on('test2', (data: unknown) => {
    called = true;
    console.assert(data === 'test2 params');
  });
  eventHub.emit('test2', 'test2 params');
  console.assert(called);
  console.log(message);
};

const test3 = (message: string): void => {
  const eventHub = new EventHub();
  let called = false;
  const fn = (data: unknown) => {
    called = true;
    console.assert(data === 'test3 params');
  };
  eventHub.on('test3', fn);
  eventHub.off('test3', fn);
  eventHub.emit('test3', 'test3 params');
  console.assert(!called);
  console.log(message);
};

test1('eventHub是一个对象');
test2('.on之后，.emit会触发.on传入的函数');
test3('.off可以取消.emit触发的事件');
```

我们的源码现在是这样：  
```typescript
class EventHub {
  on() {
  
  }
  emit(){
  
  }
  off() {
  
  }
}
export default EventHub
```

这里我们其实已经满足了第一个测试用例，接下来我们实现`on`方法。

### `on`方法实现

