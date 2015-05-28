'use strict';

import Store from './store';
import Actions from './actions';
import Container from './container';
import { Dispatcher } from 'flux';

class Worsley {
  constructor() {
    this.actions = {};
    this.stores = {};
    this.dispatcher = new Dispatcher();
  }

  load(payload) {
    Object.keys(payload).forEach((name) => {
      this.stores[name].load(payload[name]);
    });
  }

  unload() {
    Object.keys(this.stores).forEach((name) => {
      this.stores[name].unload();
    });
  }

  backup() {
    const payload = {};
    Object.keys(this.stores).forEach((name) => {
      payload[name] = this.stores[name].state;
    });
    return payload;
  }
}

export {
  Store,
  Actions,
  Container,
  Worsley
};
