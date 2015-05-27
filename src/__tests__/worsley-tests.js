'use strict';

import { Worsley } from '../worsley';
import assert from 'assert';
import sinon from 'sinon';

class TestWorsley extends Worsley {}

describe('Worsley', () => {

  const testWorsley = new TestWorsley();

  it('initializes with actions', () => {
    assert.deepEqual(testWorsley.actions, {});
  });

  it('initializes with stores', () => {
    assert.deepEqual(testWorsley.stores, {});
  });

  it('initializes with a dispatcher', () => {
    assert.notEqual(testWorsley.dispatcher, undefined);
  });
});
