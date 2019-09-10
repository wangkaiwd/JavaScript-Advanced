// interface Person {
//   name: string;
//   age: number;
//   sex: 'female' | 'male';
// }
// 这里this的类型到底是什么？
const Person = function (this: any, name: string, age: number) {
  this.name = name;
  this.age = age;
  this.sex = 'male';
};

const person = new (Person('wk', 12) as any);
