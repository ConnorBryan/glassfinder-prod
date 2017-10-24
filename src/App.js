/*
  G L A S S F I N D E R
    by Connor Bryan
*/

import React, { Component } from 'react';

/*
  R e d u x
    I m p o r t s
*/
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';

/* R e d u x */
export const SET_VERSION = 'SET_VERSION';

export const setVersion = version => ({ type: SET_VERSION, version });

export const INITIAL_STATE = {
  version: '1.0.0',
};

export const HANDLERS = {
  [SET_VERSION]: (state, { version }) => ({ ...state, version }),
};

export const REDUCER = (state = INITIAL_STATE, action) => (
  HANDLERS[action.type]
    ? HANDLERS[action.type](state, action)
    : state
);

export const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
export const configureStore = () => finalCreateStore(REDUCER, INITIAL_STATE);

const STORE = configureStore();

console.log(STORE.getState())

/* R e a c t */
export default class App extends Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  render() {
    return (
      <div store={STORE}>

        App
      </div>
    );
  }
}