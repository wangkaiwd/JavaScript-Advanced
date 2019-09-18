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
      console.log('o2', o2);
      assert.deepStrictEqual(o2, o1);
    });
  });
});
