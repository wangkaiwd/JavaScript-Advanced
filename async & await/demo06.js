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
      resolve('操作A');
    }, 4000);
  });
};

const $ = (selector) => document.querySelector(selector);
const $buttonA = $('#buttonA');
const $buttonB = $('#buttonB');

$buttonA.addEventListener('click', () => {
  promiseA().then(response => {

  });
});

$buttonB.addEventListener('click', () => {
  promiseB().then(response => {
    
  });
});
