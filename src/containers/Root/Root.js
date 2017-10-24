import React, { Component } from 'react';
import { Provider } from 'react-redux';

export default class Root extends Component {
  render() {
    const {
      children,
      store
    } = this.props;

    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
}