let x = 'x';
let a = 1;

function f1 (x) {
  return x + a;
}

{
  let x = 'x';
  let a = 2;
  console.log(f1(x)); // "x1"
}
