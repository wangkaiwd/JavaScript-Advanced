var ArrayPrototypeSlice = Array.prototype.slice;
Function.prototype.myBind = function (otherThis) {
  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var baseArgs = ArrayPrototypeSlice.call(arguments, 1),
    baseArgsLength = baseArgs.length,
    fToBind = this,
    fNOP = function () {},
    fBound = function () {
      baseArgs.length = baseArgsLength; // reset to default base arguments
      baseArgs.push.apply(baseArgs, arguments);
      return fToBind.apply(
        fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
      );
    };

  if (this.prototype) {
    // Function.prototype doesn't have a prototype property
    fNOP.prototype = this.prototype;
  }
  fBound.prototype = new fNOP();

  return fBound;
};

function Point (x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return `${this.x},${this.y}`;
};

// const p = new Point(1, 2);
// p.toString();
// // '1,2'
//
// //  not supported in the polyfill below,
//
// //  works fine with native bind:
//
// const YAxisPoint = Point.myBind(null, 0/*x*/);

const emptyObj = {};
const YAxisPoint = Point.myBind(emptyObj, 0/*x*/);

const axisPoint = new YAxisPoint(5);
console.log(axisPoint);
axisPoint.toString();                    // '0,5'

console.log(axisPoint instanceof Point);              // true
console.log(axisPoint instanceof YAxisPoint);         // true
console.log(new YAxisPoint(17, 42) instanceof Point); // true
function create (proto) {
  function Fn () {}

  Fn.prototype = proto;
  return new Fn();
}
