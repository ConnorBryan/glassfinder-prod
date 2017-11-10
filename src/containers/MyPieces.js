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

import CONSTANTS from '../constants';
import PieceCard from '../components/PieceCard';

export function MyPieces(props) {
  const {
    myAccount: { pieces },
  } = props;

  if (!pieces) return (
    <Redirect to='/my-account' />
  );

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
        <PieceCard
          key={index}
          price={price}
          image={image}
          title={title}
          description={description} />
      );
    }),
  ];
}

MyPieces.propTypes = {};

export default MyPieces;