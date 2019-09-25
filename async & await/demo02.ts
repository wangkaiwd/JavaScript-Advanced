// 异步函数声明
async function getHello1 (): Promise<string> {
  return 'Hello';
}

// 异步函数表达式：
const getHello2 = async function (): Promise<string> {
  return 'Hello';
};

// es6
const getHello3 = async (): Promise<string> => {
  return 'Hello';
};

async function f () {
  // return await 123;
  // 等同于
  return 123;
}

f().then(r => console.log(r)); // 123

const sleep = () => new Promise((resolve, reject) => {
  const startDate = Date.now();
  setTimeout(() => resolve(Date.now() - startDate), 4000);
});

(async () => {
  // 只会阻塞函数内部代码的执行，并不会阻塞外部代码的执行
  const duration = await sleep();
  console.log('duration', duration);
})();

async function f2 () {
  await Promise.reject('出错了');
  console.log('test whether execute');
  // await Promise.resolve('hello world');
}

f2().catch((res) => console.log(res));
console.log('end');
