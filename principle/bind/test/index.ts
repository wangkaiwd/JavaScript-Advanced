import myBind from '../src';

const test1 = () => {
  const fn = function (this: any, ...args: any[]): any {
    console.log('this', this);
    return args;
  };

  const newFn = fn.myBind();
  console.log('newFn', newFn(1, 2, 3, 4));
};

export {};
