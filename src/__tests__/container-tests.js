'use strict';

import { Actions, Stores, Worsley, Container } from '../worsley';
import React from 'react/addons';
import assert from 'assert';
import sinon from 'sinon';

const TestUtils = React.addons.TestUtils;
const state = { foo: 'bar' };
const flux = {
  stores: {
    TestStore: { state: state }
  }
};

class TestComponent extends React.Component {
  render() {
    return React.DOM.h1(null, this.props.foo);
  }
}

describe('Container', () => {

  describe('stores state', () => {
    const renderer = TestUtils.createRenderer();

    renderer.render(
      React.createElement(Container, {flux: flux, stores: ['TestStore']},
        React.createElement(TestComponent, null)
      )
    );

    const result = renderer.getRenderOutput();

    it('assigns as props', () => {
      assert.deepEqual(result.props, state);
    });
  });
});
