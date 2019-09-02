import EventHub from '../src/index';

const eventHub = new EventHub();
eventHub.on('test1', (data: unknown) => {
  console.log('data', data);
});

eventHub.emit('test1', 'test1');
