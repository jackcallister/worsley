'use strict';

import { Dispatcher } from 'flux';
import { Actions } from '../worsley';
import assert from 'assert';
import sinon from 'sinon';

describe('Actions', () => {

  const dispatcher = new Dispatcher();
  const flux = { dispatcher: dispatcher };

  describe('constants', () => {

    class TestActions extends Actions {

      method() {
        return;
      }
    }

    it('constructs a set of constants', () => {
      const actions = new TestActions(flux);

      assert.deepEqual(actions.constants, {'method': 'method'});
    });
  });

  describe('wrapping', () => {

    class TestActions extends Actions {

      undefinedMethod() {
        return;
      }

      nullMethod() {
        return null;
      }

      intMethod() {
        return 1;
      }

      objectMethod() {
        return { foo: 'bar' };
      }
    }

    const dispatchSpy = sinon.spy();
    const fluxStub = { dispatcher: { dispatch: dispatchSpy } };
    const actions = new TestActions(fluxStub);

    it('dispatches undefined', () => {
      actions.undefinedMethod();

      sinon.assert.calledWith(dispatchSpy, {
        type: 'undefinedMethod',
        data: undefined
      });
    });

    it('dispatches null', () => {
      actions.nullMethod();

      sinon.assert.calledWith(dispatchSpy, {
        type: 'nullMethod',
        data: null
      });
    });

    it('dispatches int', () => {
      actions.intMethod();

      sinon.assert.calledWith(dispatchSpy, {
        type: 'intMethod',
        data: 1
      });
    });

    it('dispatches objects', () => {
      actions.objectMethod();

      sinon.assert.calledWith(dispatchSpy, {
        type: 'objectMethod',
        data: { foo: 'bar' }
      });
    });
  });
});
