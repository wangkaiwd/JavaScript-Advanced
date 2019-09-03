interface CacheProps {
  [key: string]: Array<((data?: unknown) => void)>;
}
class EventHub {
  //  {
  //  'test1':[f1,f2,f3],
  //  'test2':[f1,f2,f3]
  //  }
  private cache: CacheProps = {};

  on (eventName: string, fn: (data?: unknown) => void) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }

  emit (eventName: string, data?: unknown) {
    if (!this.cache[eventName]) return;
    this.cache[eventName].forEach((fn: (data?: unknown) => void) => fn(data));
  }

  off (eventName: string, fn: (data?: unknown) => void) {

  }
}
export default EventHub;

