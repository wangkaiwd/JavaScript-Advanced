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
let array2 = [];

const answer = () => {
  if (array1.length === 0) return;
  const lastKey = array1[0].key;
  const index2 = array2.findIndex(item => item.key === lastKey);
  if (index2 !== -1) {
    $input.value = array2[index2].value;
    console.log(array2[index2].value);
    array1.shift();
    array2 = array2.filter(item => item.key !== lastKey);
    answer();
  }
};
$buttonA.addEventListener('click', () => {
  array1.push({ key: 'A' });
  promiseA().then(value => {
    array2.push({ key: 'A', value });
    answer();
  });
});

$buttonB.addEventListener('click', () => {
  array1.push({ key: 'B' });
  promiseB().then(value => {
    array2.push({ key: 'B', value });
    answer();
  });
});
