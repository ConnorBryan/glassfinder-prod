import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import PieceGrid from '../components/PieceGrid';

export default class ExplorePieces extends Component {
  static propTypes = {
    localPieces: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.objectOf(PropTypes.func),
  };

  static defaultProps = {
    localPieces: [],
    actions: {},
  };

  componentDidMount() {
    const {
      localPieces,
      actions: { explorePieces },
    } = this.props;

    if (!localPieces) explorePieces();
  }
  
  render() {
    const { localPieces } = this.props;

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