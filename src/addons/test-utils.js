'use strict';

import { Dispatcher } from 'flux';

const worsley = {
  dispatcher: new Dispatcher()
};

const actions = {
  constants: {}
};

const TestUtils = {
  worsley: worsley,
  actions: actions
};

export default TestUtils;
