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
