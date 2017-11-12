import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Icon,
  Loader,
  Message,
  Segment
} from 'semantic-ui-react';

import CONSTANTS from '../constants';
import TopBar from './TopBar';
import Breadcrumbs from './Breadcrumbs';

export function Layout(props) {
  const {
    authorized,
    error,
    isLoading,
    actions: {
      deauthorize,
      setError,
    },
  } = props;

  const errorWrapperStyle = {
    height: '100%',
    pointerEvents: 'none',
    position: 'fixed',
    textAlign: 'center',
    top: '5vh',
    width: '100%',
    zIndex: 1,
  };

  const errorStyle = {
    display: 'inline-block',
  };

  return (
    <div>
      {error && (
        <div style={errorWrapperStyle}>
          <Message
            negative
            onClick={() => setError(null)}
            style={errorStyle}>
            <Icon name={CONSTANTS.ICONS.error} /> {error.message}
          </Message>
        </div>
      )}
      <TopBar
        authorized={authorized}
        deauthorize={deauthorize} />
      <Container
        attached='top'
        className='second-third'
        fluid={isLoading}>
        {isLoading ? <Loader active/>
        : (
            <Segment.Group>
              <Breadcrumbs {...props} />
              <Segment attached='bottom'>
                {props.children}
              </Segment>
            </Segment.Group>
          )}
      </Container>
    </div>
  );
}

Layout.propTypes = {
  authorized: PropTypes.bool,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default withRouter(Layout);