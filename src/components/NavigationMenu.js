import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Header,
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';

export function Items({ collection, title, toggleSidebar }) {
  const itemStyle = {
    paddingLeft: '2.5rem',
  };

  return [
    <Menu.Item
      as='h4'
      className='fancy'
      key='header'
      header>
        {title}
    </Menu.Item>,
    collection.map(({ icon, title, to, onClick }, index) => (
      <Menu.Item
        as={Link}
        className='fancy'
        key={index}
        onClick={onClick || toggleSidebar}
        style={itemStyle}
        to={to}>
        <Icon name={icon} /> {title}
      </Menu.Item>
    ))
  ];
}

export function NavigationMenu(props) {
  const {
    authorized,
    deauthorize,
    sidebarVisible,
    toggleSidebar,
  } = props;
  
  const screenItems = [
    {
      to: '/',
      title: 'Home',
      icon: 'home',
    },
    {
      to: '/explore-shops',
      title: 'Explore shops',
      icon: CONSTANTS.ICONS.shop,
    },
    {
      to: '/explore-pieces',
      title: 'Explore pieces',
      icon: CONSTANTS.ICONS.piece,
    },
  ];

  const accountItems = authorized
    ? [
        {
          to: '/my-account',
          title: 'My account',
          icon: 'user',
        },
        {
          to: '/upload-piece',
          title: 'Upload piece',
          icon: CONSTANTS.ICONS.piece,
        },
        {
          to: '/',
          title: 'Sign out',
          icon: 'sign out',
          onClick: () => {
            deauthorize();
            toggleSidebar();
          },
        },
      ]
    : [
        {
          to: '/sign-in',
          title: 'Sign in',
          icon: 'sign in',
        },
        {
          to: '/sign-up',
          title: 'Sign up',
          icon: 'user plus',        
        },
    ];
  
  return (
    <Sidebar
      animation='slide along'
      as={Menu}
      direction='right'
      inverted
      vertical
      visible={sidebarVisible}
      width='wide'>
      <Menu.Item
        className='fancy'
        onClick={toggleSidebar}>
        <Icon name='close' /> Close Menu
      </Menu.Item>
      <Items
        title='Screens'
        collection={screenItems}
        toggleSidebar={toggleSidebar} />
      <Items
        title='Account'
        collection={accountItems}
        toggleSidebar={toggleSidebar} />
    </Sidebar>
  );
}

NavigationMenu.propTypes = {
  authorized: PropTypes.bool,
  deauthorize: PropTypes.func,
  sidebarVisible: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

export default NavigationMenu;