import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  Icon,
  Image,
} from 'semantic-ui-react';

export function LinkHero(props) {
  const {
    image,
    linkType,
    description,
    link,
  } = props;

  return (
    <Card>
      <Image src={image} />
      <Card.Content>
        <Card.Header>
          Become a {linkType}
        </Card.Header>
        {description && (
          <Card.Description>
            {description}
          </Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <Link to={link}>
          <Icon name='chain' /> Link account as a {linkType}
        </Link>
      </Card.Content>
    </Card>
  );
}

LinkHero.propTypes = {
  image: PropTypes.string.isRequired,
  linkType: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export function LinkHeroes({ collection }) {
  return (
    <Card.Group>
      {collection.map((item, index) => (
        <LinkHero key={index} {...item} />
      ))}
    </Card.Group>
  );
}

LinkHeroes.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default LinkHeroes;