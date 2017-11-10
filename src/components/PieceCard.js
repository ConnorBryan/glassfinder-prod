import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import { formatMoney } from 'accounting';

export const makePriceLabel = price => ({
  as: 'div',
  color: 'green',
  content: formatMoney(price),
  ribbon: 'right',
});

export function PieceCard(props) {
  const {
    price,
    image,
    title,
    description,
  } = props;

  return (
    <Card>
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
    </Card>
  );
}

PieceCard.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default PieceCard;
