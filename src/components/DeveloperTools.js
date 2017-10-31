import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import S from 'string';

import MODELS from '../models';
import * as Formatters from '../util/formatters';

/**
 * @function DeveloperTools
 * @desc Useful for debugging purposes.
 * @param {object} props 
 * @returns {Component}
 */
export default function DeveloperTools(props) {
  const modelItems = MODELS.map(({ singular, plural }, index) => ({
    key: index,
    content: `Get ${S(plural).capitalize()}`,
    as: Link,
    to: `/${plural}`,
    onClick: e => {
      props.actions[Formatters.getModelGetter(plural)]();
      props.actions.setModelType(plural);
    },
  }));

  const items = [
    {
      key: 'header',
      header: true,
      content: 'Developer Tools',
      as: Link,
      to: '/',
    },
    ...modelItems,
  ];

  return (
    <Menu
      inverted
      items={items} />
  );
}