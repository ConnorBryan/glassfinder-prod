import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Menu,
  Icon,
  Image,
  Responsive,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';

export function TopBar(props) {
  const {
    authorized,
    deauthorize,
    sidebarVisible,
    toggleSidebar,
    zIndexOverride,
  } = props;

  const mainStyle = {
    minHeight: '6vh',
    marginTop: '-1px',
  };
  
  const mobileMinWidth = 0;
  const mobileMaxWidth = 767;
  const computerMinWidth = 768;
  const computerMaxWidth = 9999;
  
  return (
    <div ref={zIndexOverride}>
      <Responsive
        as={Menu}
        fluid
        style={mainStyle}
        minWidth={mobileMinWidth}
        maxWidth={mobileMaxWidth}>
        <Menu.Item
          as={Link}
          className='fancy'
          header
          to='/'>
          <Image size='tiny' src='/logo.png' />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item
            active={sidebarVisible}
            className='fancy'
            onClick={toggleSidebar}>
            <Icon name='bars' /> Menu
          </Menu.Item>
        </Menu.Menu>
      </Responsive>
      <Responsive
        as={Menu}
        fluid
        style={mainStyle}
        minWidth={computerMinWidth}
        maxWidth={computerMaxWidth}>
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
            key='explore-shops'
            to='/explore-shops'>
            <Icon name={CONSTANTS.ICONS.shop} /> Explore shops
          </Menu.Item>
          <Menu.Item
            as={Link}
            key='explore-pieces'
            to='/explore-pieces'>
            <Icon name={CONSTANTS.ICONS.piece} /> Explore pieces
          </Menu.Item>
          {authorized
          ? [
            <Menu.Item
              as={Link}
              key='my-account'
              to='/my-account'>
              <Icon name='user' /> My account
            </Menu.Item>,
            <Menu.Item
              key='sign-out'
              onClick={deauthorize}>
              <Icon name='sign out' /> Sign out
            </Menu.Item>
          ]
          : [
            <Menu.Item
              as={Link}
              key='sign-in'
              to='/sign-in'>
              <Icon name='sign in' /> Sign in
            </Menu.Item>,
            <Menu.Item
              as={Link}
              key='sign-up'
              to='/sign-up'>
              <Icon name='user plus' /> Sign up
            </Menu.Item>
          ]}
        </Menu.Menu>
      </Responsive>
    </div>
  );
}

TopBar.propTypes = {
  authorized: PropTypes.bool,
  deauthorize: PropTypes.func.isRequired,
  zIndexOverride: PropTypes.func,
};

export default TopBar;
