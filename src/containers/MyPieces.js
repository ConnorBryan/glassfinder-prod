import React from 'react';
import PropTypes from 'prop-types';

import PieceGrid from '../components/PieceGrid';
import withPageHeader from '../components/withPageHeader';

export function MyPieces(props) {
  const { myAccount: { pieces } } = props;

  return (
    <PieceGrid collection={pieces} />
  );
}

MyPieces.propTypes = {
  myAccount: PropTypes.object,
};

export default withPageHeader(MyPieces);