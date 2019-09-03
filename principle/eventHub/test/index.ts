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
  setTimeout(() => {
    console.assert(called);
    console.log(message);
  }, 1000);
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
  setTimeout(() => {
    console.assert(!called);
    console.log(message);
  }, 1000);
};

test1('eventHub是一个对象');
test2('.on之后，.emit会触发.on传入的函数');
test3('.off可以取消.emit触发的事件');
