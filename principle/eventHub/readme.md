## 实现`eventHub`
> 这里会用`TypeScript`来实现对应的功能，如果有小伙伴不熟悉的话可以去官网查看基础语法：[基础类型](https://www.tslang.cn/docs/handbook/basic-types.html)

需要依赖：  
* `typescript`
* `ts-node`

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
> 我们可以在根目录执行`npx tsc --init`来生成`tsconfig.json`来启用`strict`配置，让我们的`TypeScript`不能使用隐式的`any`

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

这里我们其实已经满足了第一个测试用例，接下来我们实现`on`方法和`emit`方法。

### `on`方法和`emit`实现
`on`是用来进行事件订阅的，我们可以为某一个事件订阅多个方法。这里我们需要声明一个全局变量来存储订阅的事件以及其对应的执行函数
```typescript
interface CacheProps {
  // unknown是一个安全的any,他一旦被分配类型后就不能再更改
  [key: string]: Array<((data?: unknown) => void)>;
}
class EventHub {
  private cache: CacheProps = {};
  on (eventName: string, fn: (data?: unknown) => void) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
}
```

上边代码通过`on`方法将事件名作为`key`值，将事件名对应的函数作为`value`值存入到`cache`对象中，这样会方便我们之后的事件发布。

接下来我们通过`emit`方法进行事件发布,我们需要传入对应的事件名和事件触发时对应函数执行的参数：  
```typescript
class EventHub {
  ...
  emit (eventName: string, data?: unknown) {
    // if (!this.cache[eventName]) return;
    // this.cache[eventName].forEach((fn: (data?: unknown) => void) => fn(data));
    (this.cache[eventName] || []).forEach((fn: (data?: unknown) => void) => fn(data));
  }
  ...
}
```
`emit`方法会将所有`on`方法中对应订阅事件的所有函数执行，并在执行时传入对应的参数。

到这里我们已经实现了发布订阅功能，命令行输入： `npx ts-node test/index.ts`

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/advanced-js-eventHub-test-onemit.png)

成功完成前2个需求。

### 实现`off`方法


