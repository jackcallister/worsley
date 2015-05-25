'use strict';

import Events from 'events';
import assign from 'object-assign';

class Store extends Events.EventEmitter {

  constructor(instance) {
    super();
    this.dispatcher = instance.dispatcher;
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

  registerActionHandler(constant, func) {
    const fn = func.bind(this);

    this.dispatcher.register(function(payload) {
      if (payload.type === constant) {
        fn(payload.data);
      }
    });
  }
}

export default Store;
