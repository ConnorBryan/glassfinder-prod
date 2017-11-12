import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Item,
} from 'semantic-ui-react';

export function truncate(description, amount = 20) {
  return description
    .split(' ')
    .slice(0, amount)
    .concat('...')
    .join(' ');
}

export function ShopItem(props) {
  const {
    city,
    description,
    email,
    history,
    id,
    image,
    linkToShop,
    name,
    phone,
    state,
    street,
    truncated,
    zip,
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
          as={Link}
          to={`/s/${id}`}
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

ShopItem.propTypes = {
  city: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  history: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  linkToShop: PropTypes.bool,
  name: PropTypes.string,
  phone: PropTypes.string,
  state: PropTypes.string,
  street: PropTypes.string,
  truncated: PropTypes.bool,
  zip: PropTypes.string,
};

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

ShopItems.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
};

ShopItems.defaultProps = {
  collection: [],
};

export default ShopItems;