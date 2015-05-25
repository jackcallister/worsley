'use strict';

class Actions {

  constructor(instance) {
    this.dispatcher = instance.dispatcher;
    this.ids = this._constructIds();
    this._wrapActions();
  }

  _dispatch(actionId, data) {
    this.dispatcher.dispatch({
      type: actionId,
      data: data
    });
  }

  _wrapActions() {
    const ids = Object.keys(this.ids);

    for (let i = 0; i < ids.length; i++) {
      this._wrapAction(ids[i]);
    }
  }

  _wrapAction(actionId) {
    const unwrappedMethod = this[actionId];

    const wrappedMethod = (...args) => {
      const data = unwrappedMethod.apply(this, args);

      this._dispatch(actionId, data);

      return data;
    };

    this[actionId] = wrappedMethod;
  }

  _constructIds() {
    const ids = {};
    const actionNames = Object.getOwnPropertyNames(this.constructor.prototype)
                              .filter((name) =>
      name !== 'constructor' && typeof this[name] === 'function'
    );

    for (let i = 0; i < actionNames.length; i++) {
      ids[actionNames[i]] = actionNames[i];
    }

    return ids;
  }
}

export default Actions;
