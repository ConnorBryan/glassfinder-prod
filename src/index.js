/*
  G L A S S F I N D E R
    by Connor Bryan
*/
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import CONSTANTS from './constants';
import AgeGate from './containers/AgeGate';
import Layout from './components/Layout';
import STORE, { mapStateToProps, mapDispatchToProps } from './redux';
import './index.css';

/**
 * @class BaseApp
 * @desc This is the primary application delivered to the end user.
 */
export class BaseApp extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  };

  static defaultProps = {
    actions: {},
  };

  /**
   * L I F E C Y C L E
   *    M E T H O D S
   */
  componentDidMount() {
    const { setReduxProps, actions: { initialize } } = this.props;

    setReduxProps({...this.props});
    initialize();
  }

  componentDidUpdate() {
    const { setReduxProps } = this.props;

    setReduxProps({ ...this.props });
  }

  requiresAuthorized = Component => {
    const { authorized } = this.props;

    return authorized ? Component : <Redirect to='/' />;
  }

  requiresUnauthorized = Component => {
    const { authorized } = this.props;

    return authorized ? <Redirect to='/' /> : Component;
  }

  render() {
    const {
      hasPassedAgeGate,
      actions: { passAgeGate },
    } = this.props;

    return (
      <Router>
        <Layout {...this.props}>
            {hasPassedAgeGate
              ? (
                <Switch>
                  {CONSTANTS.ROUTES.map((route, index) => {
                    const {
                      path,
                      requiresAuthorized,
                      requiresUnauthorized,
                      Component,
                    } = route;
                    
                    let authFunc = Component => Component;
                    
                    if (requiresAuthorized) authFunc = this.requiresAuthorized;
                    if (requiresUnauthorized) authFunc = this.requiresUnauthorized;
                    
                    const render = (history, location) => authFunc(
                      <Component
                        {...this.props}
                        {...history}
                        {...location}
                        {...route} />
                    );

                    return (
                      <Route
                        exact
                        key={index}
                        path={path}
                        render={render} />
                    );
                  })}
                </Switch>
              )
              : (
                <AgeGate onClick={passAgeGate} />
              )}
        </Layout>
      </Router>
    );
  }
}

/**
 * @const App
 * @desc This is the raring-to-go application in all its glory.
 */
export const App = connect(mapStateToProps, mapDispatchToProps)(BaseApp);

/**
 * @class Root
 * @desc The Root acts as the provider for Redux data.
 */
export class Root extends Component {
  render () {
    const { setReduxProps, store } = this.props;

    return (
      <Provider store={store}>
        <App setReduxProps={setReduxProps} />
      </Provider>
    );
  }
}

/**
 * @class Everything
 * @desc Yup, all of it.
 */
export class Everything extends Component {
  constructor() {
    super();
    this.state = { reduxProps: null };
  }
  
  setReduxProps = reduxProps => this.setState({ reduxProps });
  
  render() {
    return (
      <Root
        setReduxProps={this.setReduxProps}
        store={STORE} />
    );
  }
}

ReactDOM.render(<Everything />, document.getElementById('root'));
