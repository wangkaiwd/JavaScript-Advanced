import { assert } from 'chai';
import deepClone from '../src';

describe('deepClone', () => {
  it('它是一个函数', () => {
    assert.isFunction(deepClone);
  });
});
