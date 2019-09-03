import EventHub from '../src/index';

const eventHub = new EventHub();
const f = (data: unknown) => {
  console.log('data', data);
};
eventHub.on('test1', f);
eventHub.off('test1', f);
eventHub.emit('test1', 'test1');
