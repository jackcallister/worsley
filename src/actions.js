'use strict';

class Actions {

  constructor(instance) {
    this.dispatcher = instance.dispatcher;
    this.constants = this._constructConstants();
    this._wrapActions();
  }

  _dispatch(constant, data) {
    this.dispatcher.dispatch({
      type: constant,
      data: data
    });
  }

  _wrapActions() {
    const constants = Object.keys(this.constants);

    for (let i = 0; i < constants.length; i++) {
      this._wrapAction(constants[i]);
    }
  }

  _wrapAction(constant) {
    const unwrappedMethod = this[constant];

    const wrappedMethod = (...args) => {
      const data = unwrappedMethod.apply(this, args);

      this._dispatch(constant, data);

      return data;
    };

    this[constant] = wrappedMethod;
  }

  _constructConstants() {
    const constants = {};
    const actionNames = Object.getOwnPropertyNames(this.constructor.prototype)
                              .filter((name) =>
      name !== 'constructor' && typeof this[name] === 'function'
    );

    for (let i = 0; i < actionNames.length; i++) {
      constants[actionNames[i]] = actionNames[i];
    }

    return constants;
  }
}

export default Actions;
