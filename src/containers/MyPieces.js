import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Card,
  Header,
  Icon,
  Image,
  Label,
} from 'semantic-ui-react';
import { formatMoney } from 'accounting';

import CONSTANTS from '../constants';

export function MyPieces(props) {
  const {
    myAccount: { pieces },
  } = props;

  if (!pieces) return (
    <Redirect to='/my-account' />
  );

  const makePriceLabel = price => ({
    as: 'div',
    color: 'green',
    content: formatMoney(price),
    ribbon: 'right',
  });

  return [
    <Header
      as='h2'
      className='fancy'
      key='header'>
      <Icon name={CONSTANTS.ICONS.piece} /> My pieces
    </Header>,
    pieces.map((piece, index) => {
      const {
        image,
        title,
        price,
        description
      } = piece;

      return (
        <Card
          fluid
          key={index}>
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
    }),
  ];
}

MyPieces.propTypes = {};

export default MyPieces;