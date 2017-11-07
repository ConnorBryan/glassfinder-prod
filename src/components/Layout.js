import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Icon,
  Label,
  Loader,
  Segment
} from 'semantic-ui-react';

import TopBar from './TopBar';

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

  return (
    <div className='Layout'>
      <TopBar
        authorized={authorized}
        deauthorize={deauthorize} />
      <Container
        attached='top'
        className='second-third'
        fluid={isLoading}>
        {isLoading
          ? (
          <Loader active/>
          )
          : (
          <Segment>
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
            {props.children}
          </Segment>
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

export default Layout;