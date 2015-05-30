'use strict';

import Events from 'events';
import assign from 'object-assign';

class Store extends Events.EventEmitter {

  constructor(worsley) {
    super();
    this.dispatcher = worsley.dispatcher;
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

  registerActionHandlers(handlers) {
    const keys = Object.keys(handlers);

    for (let i = 0; i < keys.length; i++) {
      const func = this[keys[i]].bind(this);
      const constant = handlers[keys[i]];

      this._registerWithDispatcher(func, constant);
    }
  }

  load(payload) {
    this.state = payload;
  }

  unload() {
    this.state = this._initialState;
  }

  _registerWithDispatcher(func, constant) {
    this.dispatcher.register((payload) => {
      if (payload.type === constant) {
        func(payload.data);
      }
    });
  }
}

export default Store;
