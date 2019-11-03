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
let queue = [];

const answer = (key, value) => {
  const index = queue.findIndex(item => item.key === key);
  console.log('index', index, queue);
  if (queue[0].value) {
    $input.value = value;
  } else {
    if (index === 0) {
      $input.value = value;
    }
  }
  queue[index].value = value;
};
$buttonA.addEventListener('click', () => {
  queue.push({ key: 'A' });
  promiseA().then(string => {
    answer('A', string);
  });
});

$buttonB.addEventListener('click', () => {
  queue.push({ key: 'B' });
  promiseB().then(string => {
    answer('B', string);
  });
});
