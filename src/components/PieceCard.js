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
          fluid
          className='fancy'
          color='green'
          icon='dollar'
          content='Purchase' />
      </Card.Content>
    </Card>
  );
}

PieceCard.propTypes = {
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
  return collection.map((piece, index) => {
    const {
      price,
      image,
      title,
      description,
      userId
    } = piece;

    return (
        <PieceCard
          fluid
          raised
          showOwner={showOwner}
          key={index}
          price={price}
          image={image}
          title={title}
          description={description}
          userId={userId} />
    );
  })
}

export default PieceCards;
