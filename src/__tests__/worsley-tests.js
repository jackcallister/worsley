'use strict';

import { Worsley, Store } from '../worsley';
import assert from 'assert';
import sinon from 'sinon';


describe('Worsley', () => {

  const initialState = { foo: 'bar' };

  class TestStore extends Store {
    constructor(flux) {
      super(flux);
      this.setInitialState(initialState);
    }
  }

  class TestWorsley extends Worsley {
    constructor() {
      super();
      this.stores.TestStore = new TestStore(this);
    }
  }

  describe('#constructor', () => {
    class EmptyWorsley extends Worsley {}
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
  });

  describe('#load', () => {
    let testWorsley = new TestWorsley();
    const payload = {
      TestStore: {
        foo: 'baz'
      }
    };

    it('loads stores with data', () => {
      testWorsley.load(payload);
      assert.deepEqual(testWorsley.stores.TestStore.state, payload.TestStore);
    });
  });

  describe('#unload', () => {
    let testWorsley = new TestWorsley();

    it('resets store data', () => {
      testWorsley.unload();
      assert.deepEqual(testWorsley.stores.TestStore.state, initialState);
    });
  });

  describe('#backup', () => {
    let testWorsley = new TestWorsley();

    const expectedPayload = {
      TestStore: {
        foo: 'bar'
      }
    };

    it('returns the current payload', () => {
      const payload = testWorsley.backup();
      assert.deepEqual(expectedPayload, payload);
    });
  });
});
