const fn = async (): Promise<void> => {
  const ajax1 = () => {
    console.log(1);
    Promise.resolve(1);
  };
  const ajax2 = () => {
    console.log(2);
    Promise.resolve(2);
  };
  const ajax3 = () => {
    console.log(3);
    Promise.resolve(3);
  };
  const array = [ajax1, ajax2, ajax3];
  for (let i = 0; i < array.length; i++) {
    await array[i]();
  }
};
fn().then(res => console.log(res));
