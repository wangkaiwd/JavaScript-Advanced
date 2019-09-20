import { assert } from 'chai';
import deepClone from '../src';

describe('deepClone', () => {
  it('是一个函数', () => {
    assert.isFunction(deepClone);
  });
  it('能够复制基本数据类型', () => {
    const n1 = 123;
    const n2 = deepClone(n1);
    assert(n1 === n2);
  });
  describe('对象', () => {
    it('能够复制普通对象', () => {
      const o1 = { value: '1', child: { value: '1-1' } };
      const o2 = deepClone(o1);
      assert.deepStrictEqual(o2, o1);
    });
    it('能够复制数组', () => {
      const o1 = [[1, 2, 3], [4, 5, [6, 7]], 8, 9];
      const o2 = deepClone(o1);
      assert.deepStrictEqual(o2, o1);
    });
    it('能够复制函数', () => {
      const o1 = function (x: number, y: number): number {
        return x + y;
      };
      o1.x = { y: { zzz: 111 } };
      const o2 = deepClone(o1);
      // @see: https://github.com/chaijs/chai/issues/697#issuecomment-216795189
      // assert.deepStrictEqual(o2, o1);
      assert(o2 !== o1);
      assert.deepStrictEqual(o2.x, o1.x);
      assert.strictEqual(o2(1, 2), o1(1, 2));
    });
    it('环也能复制', () => {

    });
    xit('不会爆栈', () => {
      const object1: any = {};
      let object2: any = object1;
      let i = 0;
      while (i < 1000) {
        object2.child = {
          child: 1
        };
        object2 = object2.child;
        i++;
      }
      const copyObject1 = deepClone(object1);
      assert.deepStrictEqual(copyObject1, object1);
    });
    it('能复制正则表达式', () => {
      // RegExp.prototype.source: 返回一个值为当前正则表达式对象的模式文本(pattern)的字符串
      // RegExp.prototype.flags: 返回一个字符串，由当前正则表达式对象的标志(flag)组成
      // 正则表达式由2部分组成：
      //  1. pattern: 正则表达式的文本
      //  2. flags: 标志(可选),可以具有以下值的任意组合: g/i/m/u/s
      const reg1 = new RegExp('hi\\d+', 'gi');
      const reg2 = deepClone(reg1);
      assert(reg2.source === reg1.source);
      assert(reg2.flags === reg1.flags);
      assert(reg2 !== reg1);
    });
    it('能复制日期', () => {
      const date1 = new Date();
      const date2 = deepClone(date1);
      assert.strictEqual(date2.getTime(), date1.getTime());
      assert.notStrictEqual(date2, date1);
    });
    it('不会复制对象原型上的属性和方法', () => {
      // 创建一个对象,对象的原型对象为{name: 'o1'}
      // 即: o1.__proto__ = {name: 'o1'}
      // 也可以传入第二个参数： 自身属性对象的属性描述以及相应的属性名称
      // const o1 = Object.create({name:'o1'},{foo:{writable:true,configurable:true,value:'hello'}})
      // {
      //       foo:'hello',
      //       __proto__: {name: 'o1', __proto__: Object.prototype}
      // }
      const o1 = Object.create({ name: 'o1' });
      o1.age = 12;
      const o2 = deepClone(o1);
      assert.isFalse('name' in o2);
      assert.strictEqual(o2.age, o1.age);
    });
    it('复制很复杂的对象', () => {
      const test = {
        n1: Infinity,
        n2: NaN,
        s: '',
        reg: /test/gi,
        n: null,
        u: undefined,
        bool: false,
        sym: Symbol(),
        date: new Date(),
      };
      // Object.values: es2017 support
      const o1 = { ...test, test, array: [test, ...Object.values(test)] };
      const o2 = deepClone(o1);
      // deepStrictEqual 可以测试NaN，NaN应该和任何值都不相等，这里应该做了处理
      assert.deepStrictEqual(o2, o1);
      // FIXME: 函数应该如何测试
    });
  });
});
