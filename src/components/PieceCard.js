import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Image,
} from 'semantic-ui-react';
import { formatMoney } from 'accounting';

export const makePriceLabel = price => ({
  as: 'div',
  color: 'green',
  content: formatMoney(price),
  ribbon: 'right',
});

export function PieceCard(props) {
  const {
    id,
    showOwner,
    fluid,
    raised,
    price,
    image,
    title,
    description,
    userId,
  } = props;

  return (
    <Card
      fluid={fluid}
      raised={raised}>
      <Image
        label={makePriceLabel(price)}
        src={image} />
      <Card.Content>
        <Card.Header>
          {title}
        </Card.Header>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
      {showOwner && userId && (
        <Card.Content extra>
          <Button
            as={Link}
            className='fancy'
            content='View owner'
            fluid
            icon='user'
            to={`/u/${userId}`} />
        </Card.Content>
      )}
      <Card.Content extra>
        <Button
          as={Link}
          className='fancy'
          content='More info' 
          fluid
          icon='info circle'
          primary
          to={`/p/${id}`} />
      </Card.Content>
      <Card.Content extra>
        <Button
          as={Link}
          fluid
          className='fancy'
          color='green'
          icon='dollar'
          content='Purchase'
          to={`/purchase/${id}`} />
      </Card.Content>
    </Card>
  );
}

PieceCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showOwner: PropTypes.bool,
  fluid: PropTypes.bool,
  raised: PropTypes.bool,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export function PieceCards({ collection, showOwner }) {
  return collection.map((piece, index) => (
      <PieceCard
        fluid
        raised
        showOwner={showOwner}
        key={index}
        {...piece} />
  ));
}

export default PieceCards;
