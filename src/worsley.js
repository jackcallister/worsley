'use strict';

import Store from './store';
import Actions from './actions';
import { Dispatcher } from 'flux';

export default class Worsley {
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

const Flux = Worsley;

export {
  Store,
  Actions,
  Worsley,
  Flux
};
