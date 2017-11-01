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
  Route,
  Switch,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container, Segment } from 'semantic-ui-react';

import Home from './containers/Home';
import Master from './containers/Master';
import Detail from './containers/Detail';
import DeveloperTools from './components/DeveloperTools';
import MODELS from './models';
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
    const { actions: { initialize } } = this.props;

    initialize();
  }

  render() {
    const { error } = this.props;

    return (
      <Container fluid>
        <Router>
          <div>
            <DeveloperTools {...this.props} />
            {error && (
              <Segment>
                {error.message}
              </Segment>
            )}
            <Switch>
              <Route
                exact
                path='/'
                render={history => <Home history={history} {...this.props} />} />
              {MODELS.map(({ singular, plural }, index) => [
                <Route
                  exact
                  key={`${singular}-master`}
                  path={`/${plural}`}
                  render={() => (
                    <Master
                      type={plural}
                      {...this.props} />
                  )} />,
                <Route
                  exact
                  key={`${singular}-detail`}
                  path={`/${singular}/:id`}
                  render={router => (
                    <Detail
                      type={singular}
                      {...this.props}
                      {...router} />
                  )} />,
              ])} 
            </Switch>
          </div>
        </Router>
      </Container>
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
    const { store } = this.props;

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

/**
 * @function Everything
 * @desc Yup, all of it.
 */
export const Everything = () => (
  <Root store={STORE}>
    <Router>
      <App />
    </Router>
  </Root>
);

ReactDOM.render(<Everything />, document.getElementById('root'));
