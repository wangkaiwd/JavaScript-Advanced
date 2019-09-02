## 手写`eventHub`
用法：  
```js
EventHub.on('test',(data) => {
  console.log('data',data);
})

EventHub.on('test',(data) => {
  console.log('data2',data);
})

EventHub.emit('test',data)
```
