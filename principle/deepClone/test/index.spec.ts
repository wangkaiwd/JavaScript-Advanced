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
    // xit: skip(跳过)这个用例
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
  });
});
