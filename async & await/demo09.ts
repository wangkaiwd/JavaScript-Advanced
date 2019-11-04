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

const getUser = async () => {
  // 想要在try catch之后使用user,要提升作用域
  let user;
  try {
    user = await fetchUser();
  } catch (e) {
    console.log('error', e);
  }
  console.log(user);
};
getUser().then();
