import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Icon,
  Loader,
  Message,
  Segment,
  Sidebar,
  Sticky
} from 'semantic-ui-react';

import CONSTANTS from '../constants';
import TopBar from './TopBar';
import Breadcrumbs from './Breadcrumbs';

export class Layout extends Component {
  static propTypes = {
    authorized: PropTypes.bool,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  };

  state = {};

  handleContext = context => this.setState({ context });
  
  /**
   * @method zIndesOverride
   * @desc Due to the nature of Sticky in Semantic UI React,
   *       this hack is used to set the zIndex on the Sticky element
   *       after attaching it to content.
   * @param {DOMNode}
   */
  zIndexOverride = ({ parentNode }) => console.log(1) || (parentNode.style.zIndex = 1);

  render () {
    const {
      authorized,
      children,
      error,
      isLoading,
      sidebarVisible,
      actions: {
        deauthorize,
        setError,
      },
    } = this.props;
    const { context, override } = this.state;

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

    const wrapperStyle = {
      marginBottom: '8rem',
    };

    const mainStyle = {
      minHeight: '94vh',
    };

    const bottomZoneStyle = {
      minHeight: '30vh',
      background: 'rgb(20, 20, 20)',
    };

    return (
      <div
        ref={this.handleContext}>
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
        <Sticky context={context}>
          <TopBar
            zIndexOverride={this.zIndexOverride}
            authorized={authorized}
            deauthorize={deauthorize} />
        </Sticky>
        <Container style={wrapperStyle}>
          <Segment.Group>
            <Breadcrumbs {...this.props} />
            <Segment
              attached='bottom'
              style={mainStyle}>
              {isLoading ? <Loader active /> : children}
            </Segment>
          </Segment.Group>
        </Container>
        <Container
          fluid
          style={bottomZoneStyle} />
      </div>
    );
  }
}

export default withRouter(Layout);