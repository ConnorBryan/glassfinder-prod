import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Header,
  Segment,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';

export function Breadcrumbs(props) {
  const {
    location: { pathname },
  } = props;

  const breadcrumbs = (CONSTANTS.ROUTES.find(({ path }) => path === pathname) || {}).breadcrumbs;

  if (!breadcrumbs) return null;

  return (
    <Segment>
      <Breadcrumb>
        {breadcrumbs.map(({ pageName, route, active }, index) => [
          <Breadcrumb.Section
            active={active}
            as={route ? Link : 'p'}
            to={route}
            key={`${index}+section`}>
            {pageName}
          </Breadcrumb.Section>,
          !active && (
            <Breadcrumb.Divider
              icon='right angle'
              key={`${index}+divider`} />
          ),
        ])}
      </Breadcrumb>
    </Segment>
  );
}

Breadcrumbs.propTypes = {};

export default Breadcrumbs;