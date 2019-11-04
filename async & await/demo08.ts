const getRandomNumber = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 6 + 1);
      if (Math.random() > 0.5) {
        resolve(random);
      } else {
        reject(random);
      }
    }, 3000);
  });
};

const fn = async () => {
  const n = await getRandomNumber();
  console.log(n);
};
fn().then();
export {};
