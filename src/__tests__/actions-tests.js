'use strict';

import { Actions } from '../worsley';
import assert from 'assert';
import sinon from 'sinon';

describe('Actions', () => {

  const dispatchSpy = sinon.spy();
  const flux = { dispatcher: { dispatch: dispatchSpy } };

  describe('constants', () => {

    class TestActions extends Actions {

      method() {
        return;
      }
    }

    it('constructs a set of constants', () => {
      const actions = new TestActions(flux);

      assert.deepEqual(actions.constants, {'method': 'testactionsmethod'});
    });

    describe('multiple classes', () => {

      class SecondTestActions extends Actions {

        method() {
          return;
        }
      }

      it('constructs unique constants', () => {
        const firstActions = new TestActions(flux);
        const secondActions = new SecondTestActions(flux);

        assert.notDeepEqual(firstActions.constants, secondActions.constants);
      });
    });
  });

  describe('wrapping', () => {

    const testMethod = sinon.spy();

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

      funcMethod() {
        testMethod();
      }
    }

    const actions = new TestActions(flux);

    it('dispatches undefined', () => {
      actions.undefinedMethod();

      sinon.assert.calledWith(dispatchSpy, {
        type: 'testactionsundefinedMethod',
        data: undefined
      });
    });

    it('dispatches null', () => {
      actions.nullMethod();

      sinon.assert.calledWith(dispatchSpy, {
        type: 'testactionsnullMethod',
        data: null
      });
    });

    it('dispatches int', () => {
      actions.intMethod();

      sinon.assert.calledWith(dispatchSpy, {
        type: 'testactionsintMethod',
        data: 1
      });
    });

    it('dispatches objects', () => {
      actions.objectMethod();

      sinon.assert.calledWith(dispatchSpy, {
        type: 'testactionsobjectMethod',
        data: { foo: 'bar' }
      });
    });

    it('applies functions', () => {
      actions.funcMethod();

      sinon.assert.calledOnce(testMethod);
      sinon.assert.calledWith(dispatchSpy, {
        type: 'testactionsfuncMethod',
        data: undefined
      });
    });
  });
});
