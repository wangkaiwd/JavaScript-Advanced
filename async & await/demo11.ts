const fn = async () => {
  console.log(1);
  await console.log(2);
  console.log(3);
};
fn().then();
console.log(4);
export {};
