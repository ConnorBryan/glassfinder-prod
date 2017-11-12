import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Icon,
  Item,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';

export function truncate(description, amount = 20) {
  return description
    .split(' ')
    .slice(0, amount)
    .concat('...')
    .join(' ');
}

export function ShopItem(props) {
  const {
    history,
    id,
    image,
    name,
    description,
    phone,
    email,
    street,
    city,
    state,
    zip,
    linkToShop,
    truncated,
  } = props;

  const spanStyle = {
    marginLeft: '1rem',
    marginRight: '1rem',
  };

  const descriptionStyle = {
    maxWidth: truncated ? '25rem' : '50rem',
  };

  const onClick = id => history.push(`/s/${id}`);

  return (
    <Item>
      <Item.Image
        size='small'
        src={image} />
      <Item.Content>
        <Item.Header
          as='a'
          className='fancy'>
          {name}
        </Item.Header>
        <Item.Meta>
          <Icon name='phone' /> {phone}
          <span style={spanStyle} />
          <Icon name='envelope' /> {email}
        </Item.Meta>
        <Item.Meta>
          <Icon name='map pin' /> {street}, {city}, {state} {zip}
        </Item.Meta>
        <Item.Description style={descriptionStyle}>
          {truncated ? truncate(description) : description}
        </Item.Description>
        {linkToShop && (
          <Item.Extra>
            <Button
              onClick={() => onClick(id)}
              primary
              className='fancy'
              floated='right'>
              View shop <Icon name='chevron right' />
            </Button>
          </Item.Extra>
        )}
      </Item.Content>
    </Item>
  );
}

export function ShopItems({ collection, history }) {
  return (
    <Item.Group divided>
      {collection.map((shop, index) => (
          <ShopItem
            key={index}
            history={history}
            linkToShop
            truncated
            {...shop} />
        ))}
    </Item.Group>
  )
}

ShopItems.defaultProps = {
  collection: [],
};

export default ShopItems;