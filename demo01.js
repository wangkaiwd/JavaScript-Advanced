// let x = 'x';
// let a = 1;
//
// function f1 (x) {
//   return x + a;
// }
//
// {
//   let x = 'x';
//   let a = 2;
//   console.log(f1(x)); // "x1"
// }

let x = 'x';
let a = 1;
function f1 (c) {
  c();
}
{
  let a = 2;
  function f2 () {
    console.log(x + a);
  }
  f1(f2); // 'x2'
}
