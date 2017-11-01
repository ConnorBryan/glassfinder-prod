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
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {
  Dimmer,
  Icon,
  Image,
  Loader,
  Menu,
  Segment
} from 'semantic-ui-react';

import * as Formatters from './util/formatters';
import CONSTANTS from './constants';
import Home from './containers/Home';
import Master from './containers/Master';
import Detail from './containers/Detail';
import MODELS from './models';
import STORE, { mapStateToProps, mapDispatchToProps } from './redux';
import './index.css';

export function Layout(props) {
  const {
    isLoading,
  } = props;

  return (
    <div className='Layout'>
        <Menu
          className='first-third'
          fluid>
          <Menu.Item
            as={Link}
            className='fancy'
            header
            to='/'>
            <Image size='tiny' src='/logo.png' />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              to='/sign-in'>
              <Icon name='sign in' /> Sign in
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/sign-up'>
              <Icon name='user plus' /> Sign up
            </Menu.Item>
          </Menu.Menu>
        </Menu>
          <Segment
            attached='top'        
            className='second-third'>
            {!isLoading ? props.children : (
              <Dimmer
                active
                className='second-third'>
                <Loader active />
              </Dimmer>
            )}
          </Segment>
      <Menu
        className='third-third'
        fluid
        widths={CONSTANTS.MODEL_TYPES_SINGULAR.length}>
        {CONSTANTS.MODEL_TYPES_SINGULAR.map((model, index) => {
          const plural = Formatters.getModelPlural(model);

          return (
            <Menu.Item
              as={Link}
              key={index}
              to={`/${plural}`}>
              <Icon
                circular
                name={CONSTANTS.ICONS[model]}
                size='large' />
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
}

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
    return (
      <Router>
        <Layout {...this.props}>
            <div>
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
