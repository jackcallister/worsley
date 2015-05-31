'use strict';

class Actions {

  constructor(worsley) {
    this.dispatcher = worsley.dispatcher;
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
    const actionNames = Object.keys(this.constants);

    for (let i = 0; i < actionNames.length; i++) {
      this._wrapAction(this.constants[actionNames[i]], actionNames[i]);
    }
  }

  _wrapAction(constant, actionName) {
    const unwrappedAction = this[actionName];

    const wrappedAction = (...args) => {
      const data = unwrappedAction.apply(this, args);

      this._dispatch(constant, data);

      return data;
    };

    this[actionName] = wrappedAction;
  }

  _constructConstants() {
    const constants = {};
    const actionNames = Object.getOwnPropertyNames(this.constructor.prototype)
                              .filter((name) =>
      name !== 'constructor' && typeof this[name] === 'function'
    );

    for (let i = 0; i < actionNames.length; i++) {
      let constant = this.constructor.name.toLowerCase() + actionNames[i];
      constants[actionNames[i]] = constant;
    }

    return constants;
  }
}

export default Actions;
