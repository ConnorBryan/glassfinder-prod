import React from 'react';
import PropTypes from 'prop-types';

import PieceCards from '../components/PieceCard';
import withPageHeader from '../components/withPageHeader';

export function MyPieces(props) {
  const { myAccount: { pieces } } = props;

  return (
    <PieceCards
      key='pieces'
      collection={pieces} />
  );
}

MyPieces.propTypes = {
  myAccount: PropTypes.object,
};

export default withPageHeader(MyPieces);