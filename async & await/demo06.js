const promiseA = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('操作A');
    }, 8000);
  });
};

const promiseB = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('操作B');
    }, 4000);
  });
};

const $ = (selector) => document.querySelector(selector);
const $buttonA = $('#buttonA');
const $buttonB = $('#buttonB');
const $input = $('#input');

// const queue = [{ key: 'A', value: '操作A' }, { key: 'B', value: '操作B' }];
const array1 = [];
const array2 = [];

const answer = (key, value) => {
};
$buttonA.addEventListener('click', () => {
  queue.push({ key: 'A' });
  promiseA().then(string => {
  });
});

$buttonB.addEventListener('click', () => {
  queue.push({ key: 'B' });
  promiseB().then(string => {
  });
});
