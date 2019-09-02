interface CacheProps {
  [key: string]: ((data?: unknown) => void)[]
}
class EventHub {
  // [
  //   {'test1':[f1,f2,f3]}
  //   {'test2':[f1,f2,f3]}
  // ]
  cache: CacheProps[] = [];

  on (eventName: string, fn: (data?: unknown) => void) {
    if (this.cache[eventName]) {
      this.cache[eventName].push(fn);
    } else {
      this.cache[eventName] = [fn];
    }
  }

  emit (eventName: string, data?: unknown) {
    if (!this.cache[eventName]) return;
    this.cache[eventName].forEach(fn => {
      fn(data);
    });
  }
}
export default EventHub;
