import EventHub from '../src';

const eventHub = new EventHub();
eventHub.on('test1', (data) => {
  console.log('data', data);
});

eventHub.emit('test1', 'test1');
