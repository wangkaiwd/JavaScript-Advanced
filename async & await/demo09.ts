interface RequestResult {
  name: string;
  age: number;
}
const fetchUser = () => {
  return new Promise<RequestResult>((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve({ name: 'wk', age: 12 });
    } else {
      reject('请求失败');
    }
  });
};

// const getUser = async () => {
//   // 想要在try catch之后使用user,要提升作用域
//   let user;
//   try {
//     user = await fetchUser();
//   } catch (e) {
//     console.log('error', e);
//   }
//   console.log(user);
// };

const errorHandle = (e: Error) => {
  // 这里直接将错误抛出，否则就会返回一个新的promise被user接收到
  throw e;
};
// await 和 then结合
const getUser = async () => {
  const user = await fetchUser().then(null, errorHandle);
  console.log('user', user);
};
getUser().then();
