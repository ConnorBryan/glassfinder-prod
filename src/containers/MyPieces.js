import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

import CONSTANTS from '../constants';
import PieceCards from '../components/PieceCard';

export function MyPieces(props) {
  const { myAccount: { pieces } } = props;

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
    pieces && (
      <PieceCards
        key='pieces'
        collection={pieces} />
    ),
  ];
}

MyPieces.propTypes = {
  myAccount: PropTypes.object,
};

export default MyPieces;