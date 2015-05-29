'use strict';

import Events from 'events';
import assign from 'object-assign';

class Store extends Events.EventEmitter {

  constructor(instance) {
    super();
    this.dispatcher = instance.dispatcher;
    this.state = {};
    this._initialState = {};
  }

  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  setState(newState) {
    this.state = assign(this.state, newState);
    this.emitChange();
  }

  setInitialState(state) {
    this.state = state;
    this._initialState = state;
  }

  registerActionHandler(constant, func) {
    const fn = func.bind(this);

    this.dispatcher.register(function(payload) {
      if (payload.type === constant) {
        fn(payload.data);
      }
    });
  }

  load(payload) {
    this.state = payload;
  }

  unload() {
    this.state = this._initialState;
  }
}

export default Store;
