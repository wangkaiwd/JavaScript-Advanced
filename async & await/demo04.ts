// const fn = async (): Promise<void> => {
//   const ajax1 = () => {
//     console.log(1);
//     Promise.resolve(1);
//   };
//   const ajax2 = () => {
//     console.log(2);
//     Promise.resolve(2);
//   };
//   const ajax3 = () => {
//     console.log(3);
//     Promise.resolve(3);
//   };
//   const array = [ajax1, ajax2, ajax3];
//   for (let i = 0; i < array.length; i++) {
//     await array[i]();
//   }
// };
// fn().then(res => console.log('res', res));

const fn2 = () => {
  return new Promise((resolve, reject) => {
    const randomRate = Math.random();
    if (randomRate > 0.5) {
      reject(new Error('error'));
    } else {
      resolve('success');
    }
  });
};

const errorHandler = (e: Error) => {
  console.log('error', e);
};

const fn3 = async () => {
  // 一般我们会在出错的时候希望不要影响之后的代码运行，并能对错误进行提示
  // 1. 不进行错误处理
  // 当await的Promise抛出异常时直接报错，不会执行后边的代码。
  // const response = await fn2();
  // console.log('response', response);

  // 2. 使用try catch
  // try {
  //   const response = await fn2();
  //   console.log('response', response);
  // } catch (e) {
  //   console.log('e', e);
  // }

  // 3. 使用Promise处理错误
  // 如果then中没有关于Promise对应状态的回调(比如这里传入null),那么then将创建一个新的没有经过回调函数处理的Promise
  // 这个新的Promise的最终状态为调用then方法的Promise的最终状态
  // 换句话说，如果then方法中没有Promise对应状态的处理，该then方法相当于不存在
  // .catch(errorHandler)相当于.then(undefined,errorHandler)
  // const response = await fn2().then(null, errorHandler);
  const response = await fn2().catch(errorHandler);
  console.log('response', response);

  console.log('fn3 end');
};
fn3();
