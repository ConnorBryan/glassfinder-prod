import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import PieceGrid from '../components/PieceGrid';
import withPageHeader from '../components/withPageHeader';

export class ExplorePieces extends Component {
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

    if (localPieces.length === 0) explorePieces();
  }
  
  render() {
    const { localPieces } = this.props;

    return (
      <Segment>
        {localPieces && (
          <PieceGrid
            collection={localPieces}
            showOwner
            showPurchase />
        )}
      </Segment>
    );
  }
}

export default withPageHeader(ExplorePieces);