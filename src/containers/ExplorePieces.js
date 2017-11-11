import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
  Segment,
} from 'semantic-ui-react';

import PieceGrid from '../components/PieceGrid';

export default class ExplorePieces extends Component {
  static propTypes = {};

  componentDidMount() {
    const {
      localPieces,
      actions: { explorePieces },
    } = this.props;

    if (!localPieces) explorePieces();
  }
  
  render() {
    const {
      localPieces,
      localPiecesPage,
    } = this.props;

    return (
      <Segment>
        {localPieces && (
          <PieceGrid
            pieces={localPieces}
            showOwner />
        )}
      </Segment>
    );
  }
}