import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Segment } from 'semantic-ui-react';

import CONSTANTS from '../constants';

export const getRoot = string => string.split('/')[1];

export function Breadcrumbs(props) {
  const { location: { pathname } } = props;

  const root = pathname.split('/')[1];
  
  const { breadcrumbs } = CONSTANTS.ROUTES.find(({ path }) => getRoot(path) === root) || {};
  
  if (!breadcrumbs) return null;

  return (
    <Segment attached='top'>
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

Breadcrumbs.propTypes = {
  location: PropTypes.object,
};

export default Breadcrumbs;