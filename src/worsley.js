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
}

export {
  Store,
  Actions,
  Container,
  Worsley
};
