import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Menu,
  Segment,
} from 'semantic-ui-react';
import S from 'string';

import CONSTANTS from '../constants';
import * as Formatters from '../util/formatters';

/**
 * @function Slider
 * @desc A subview presenting a type of model, as well as relevant images that link to a model.
 * @param {object} props 
 * @returns {Component}
 */
export function Slider({ collection, history, type }) {
  const plural = Formatters.getModelPlural(type);

  return (
    <Segment>
      <Menu
        attached='top'
        compact>
        <Menu.Item
          icon={CONSTANTS.ICONS[type]} />
        <Menu.Item
          className='fancy'
          header>
          {S(plural).capitalize().s}
        </Menu.Item>
        <Menu.Item position='right'>
          <em>{collection.length} found.</em>
        </Menu.Item>
      </Menu>
      <Segment
        className='Slider-images'
        attached='bottom'>
        {collection.map(({ id, image }, index) => (
          <Image
            className='Slider-image'
            key={index}
            shape='rounded'
            spaced='right'
            src={image}
            onClick={() => history.push(`/${type}/${id}`)} />
        ))}
      </Segment>
    </Segment>
  );
}

Slider.propTypes = {
  type: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};

Slider.defaultProps = {
  type: '',
  images: [],
};

export default Slider;