'use strict';

import { Dispatcher } from 'flux';
import { Store } from '../worsley';
import assert from 'assert';
import sinon from 'sinon';

describe('Store', () => {

  const dispatcher = new Dispatcher();
  const flux = { dispatcher: dispatcher };

  class TestStore extends Store {
    constructor() {
      super(flux);
    }
  }

  describe('#registerActionHandler', () => {
    const store = new TestStore();
    const method = sinon.spy();
    const actionConstant = 'testConstant';

    store.registerActionHandler(actionConstant, method);

    it('calls the handler', () => {
      dispatcher.dispatch({
        type: actionConstant,
        data: null
      });

      sinon.assert.calledOnce(method);
    });
  });

  describe('#setState', () => {
    const store = new TestStore();
    store.state = { data: 'data' };
    const expectedState = {
      data: 'data',
      newData: 'newData'
    };

    it('non-destructively assigns state', () => {
      store.setState({
        newData: 'newData'
      });

      assert.deepEqual(expectedState, store.state);
    });

    it('emits a change event', () => {
      const method = sinon.spy();
      store.emitChange = method;
      store.setState({});

      sinon.assert.calledOnce(method);
    });
  });

  describe('#setInitialState', () => {
    const store = new TestStore();
    const initialState = {
      foo: 'bar'
    };

    store.setInitialState(initialState);

    it('sets the state', () => {
      assert.deepEqual(initialState, store.state);
    });
  });
});
