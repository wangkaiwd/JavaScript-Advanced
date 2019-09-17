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
      assert.notStrictEqual(o2, o1);
      assert.strictEqual(o2.value, o1.value);
      assert.notStrictEqual(o2.child, o1.child);
    });
  });
});
