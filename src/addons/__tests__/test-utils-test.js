'use strict';

import TestUtils from '../test-utils';
import assert from 'assert';

describe('TestUtils', () => {
  const worsley = TestUtils.worsley;
  const actions = TestUtils.actions;

  it('has a dispatcher', () => {
    assert.notEqual(worsley.dispatcher, undefined);
  });

  it('has constants', () => {
    assert.notEqual(actions.constants, undefined);
  });
});
