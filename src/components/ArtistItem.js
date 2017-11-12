import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Item,
} from 'semantic-ui-react';

export function ArtistItem(props) {
   const {
    name,
    tagline,
    image,
    from,
    description,
  } = props;

  const descriptionStyle = {
    maxWidth: '50rem',
  };

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
          <Icon name='announcement' /> {tagline}
        </Item.Meta>
        <Item.Meta>
          <Icon name='map pin' /> {from}
        </Item.Meta>
        <Item.Description style={descriptionStyle}>
          {description}
        </Item.Description>
      </Item.Content>
    </Item>
  );
}

ArtistItem.propTypes = {
  name: PropTypes.string,
  tagline: PropTypes.string,
  image: PropTypes.string,
  from: PropTypes.string,
  description: PropTypes.string,
};

export default ArtistItem;