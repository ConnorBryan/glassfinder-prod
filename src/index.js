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
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {
  Container,
  Dimmer,
  Header,
  Icon,
  Image,
  Label,
  Loader,
  Menu,
  Segment
} from 'semantic-ui-react';

import AgeGate from './containers/AgeGate';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import ForgotPassword from './containers/ForgotPassword';
import Master from './containers/Master';
import Detail from './containers/Detail';
import MODELS from './models';
import STORE, { mapStateToProps, mapDispatchToProps } from './redux';
import './index.css';

export function Layout(props) {
  const {
    authorized,
    error,
    isLoading,
    actions: { setError },
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


          {!authorized && (
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
          )}
        </Menu>

          <Container
            attached='top'        
            className='second-third'>
            {error && (
              <Segment>
                <Label
                  icon='close'
                  color='red'
                  corner='right'
                  onClick={() => setError(null)} />
                <Header as='h3'>
                    <Icon name='warning sign' /> Error
                </Header>
                {error.message}
              </Segment>
            )}
            <Segment>
              {isLoading
                ? (
                  <Dimmer
                    active
                    className='second-third'
                    style={{ height: '90vh' }}>
                    <Loader active />
                  </Dimmer>
                )
                : props.children}
            </Segment>
          </Container>
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
    const {
      setReduxProps,
      actions: { initialize },
    } = this.props;

    setReduxProps({...this.props});
    initialize();
  }

  componentDidUpdate() {
    const { setReduxProps } = this.props;

    setReduxProps({ ...this.props });
  }

  requiresAuthorized(Component) {
    const { authorized } = this.props;

    return authorized ? Component : <Redirect to='/' />;
  }

  requiresUnauthorized(Component) {
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
                <div>
                  <Switch>
                    <Route
                      exact
                      path='/'
                      render={history => (
                        <Home
                          {...this.props}
                          {...history} />
                      )} />
                    <Route
                      exact
                      path='/sign-in'
                      render={history => this.requiresUnauthorized(
                        <SignIn
                          {...this.props}
                          {...history} />
                      )} />
                    <Route
                      exact
                      path='/sign-up'
                      render={history => this.requiresUnauthorized(
                        <SignUp
                          {...this.props}
                          {...history} />
                      )} />
                    <Route
                      exact
                      path='/forgot-password'
                      render={history => this.requiresUnauthorized((
                        <ForgotPassword
                          {...this.props}
                          {...history}  />
                      ))} />
                    {MODELS.map(({ singular, plural }, index) => [
                      <Route
                        exact
                        key={`${singular}-master`}
                        path={`/${plural}`}
                        render={router => (
                          <Master
                            type={plural}
                            {...this.props}
                            {...router} />
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
              )
              : <AgeGate onClick={passAgeGate} />}
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
