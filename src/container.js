'use strict';

import React from 'react/addons';
import assign from 'object-assign';

class Container extends React.Component {

  constructor(props) {
    super(props);

    this.state = this._getStateFromStores();
  }

  componentDidMount() {
    const stores = this.props.stores;

    for (let i = 0; i < stores.length; i++) {
      const store = stores[i];
      this.props.flux.stores[store].addChangeListener(this._onStoreChange.bind(this, store));
    }
  }

  _onStoreChange(store) {
    const state = this._getStateFromStore(store);

    this.setState(state);
  }

  _getChildProps() {
    const state = this._getStateFromStores();
    const actions = this._getActions();

    return assign(state, actions);
  }

  _getActions() {
    let actions = {};

    this.props.actions.map((action) => {
      actions[action] = this.props.flux.actions[action];
    });

    return actions;
  }

  _getStateFromStore(store) {
    return this.props.flux.stores[store].state;
  }

  _getStateFromStores() {
    const stores = this.props.stores.map((store) => {
      return this.props.flux.stores[store];
    });

    let state = {};

    for (let i = 0; i < stores.length; i++) {
      const s = stores[i].state;
      state = assign(state, s);
    }

    return state;
  }

  render() {
    return React.addons.cloneWithProps(this.props.children, this._getChildProps());
  }
}

Container.defaultProps = {
  stores: [],
  actions: []
};

export default Container;
