'use strict';

import { Worsley, Store } from '../worsley';
import assert from 'assert';
import sinon from 'sinon';

class TestStore extends Store {
  constructor(flux) {
    super(flux);
    this.state = {
      foo: 'bar'
    };
  }
}

class StoreWorsley extends Worsley {
  constructor() {
    super();
    this.stores.TestStore = new TestStore(this);
  }
}

class EmptyWorsley extends Worsley {}

describe('Worsley', () => {
  const emptyWorsley = new EmptyWorsley();

  it('initializes with actions', () => {
    assert.deepEqual(emptyWorsley.actions, {});
  });

  it('initializes with stores', () => {
    assert.deepEqual(emptyWorsley.stores, {});
  });

  it('initializes with a dispatcher', () => {
    assert.notEqual(emptyWorsley.dispatcher, undefined);
  });

  describe('#load', () => {
    let storeWorsley = new StoreWorsley();
    const payload = {
      TestStore: {
        foo: 'baz'
      }
    };

    it('loads stores with data', () => {
      storeWorsley.load(payload);
      assert.deepEqual(storeWorsley.stores.TestStore.state, payload.TestStore);
    });
  });

  describe('#unload', () => {
    let storeWorsley = new StoreWorsley();

    xit('resets store data', () => {
      storeWorsley.unload();
      assert.deepEqual(storeWorsley.stores.TestStore.state, { foo: 'bar' });
    });
  });

  describe('#backup', () => {
    let storeWorsley = new StoreWorsley();

    const expectedPayload = {
      TestStore: {
        foo: 'bar'
      }
    };

    it('returns the current payload', () => {
      const payload = storeWorsley.backup();
      assert.deepEqual(expectedPayload, payload);
    });
  });
});
