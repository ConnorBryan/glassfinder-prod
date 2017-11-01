import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Image,
  Menu,
  Segment,
} from 'semantic-ui-react';
import S from 'string';

import CONSTANTS from '../constants';
import * as Formatters from '../util/formatters';

/**
 * @class Slider
 * @desc A subview presenting a type of model, as well as relevant images that link to a model.
 */
export default class Slider extends Component {
  static propTypes = {
    type: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    type: '',
    images: [],
  };

  constructor(props) {
    super(props);

    this.state = { expanded: true };
  }

  toggleExpanded = () => this.setState(prevState => ({ ...this.state, expanded: !prevState.expanded }));

  render() {
    const { collection, history, type } = this.props;
    const { expanded } = this.state;

    const plural = Formatters.getModelPlural(type);

    return (
      <Segment>
        <Menu
          attached='top'
          compact>
          {collection.length > 0 && (
            <Menu.Item
              icon={expanded ? 'caret up' : 'caret down'}
              onClick={this.toggleExpanded} />
          )}
          <Menu.Item
            className='fancy'
            header>
            <Icon name={CONSTANTS.ICONS[type]} /> {S(plural).capitalize().s}
          </Menu.Item>
          <Menu.Item position='right'>
            <em>{collection.length} found.</em>
          </Menu.Item>
        </Menu>
        {expanded && collection.length > 0 && (
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
        )}
      </Segment>
    );
  }
}
