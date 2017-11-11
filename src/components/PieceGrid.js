import React, { Component } from 'react';
import PropTypes from 'prop-types';
import{ Card, Grid } from 'semantic-ui-react';

import PieceCards from './PieceCard';

export default class PieceGrid extends Component {
  static defaultProps = {
    pieces: [],
  };

  /**
   * @method threeify
   * @desc Transform an array for the grid.
   * @param {Array<Piece>} pieces
   * @returns {Array<Array<Piece>>}
   */
  threeify(pieces) {
    return pieces.reduce((collection, piece) => {
      if (!collection) return [[piece]];

      const mostRecent = collection.length - 1;
      const { length } = collection[mostRecent];

      length === 3
        ? collection.push([piece])
        : collection[mostRecent].push(piece);

      return collection;      
    }, null);
  }

  render() {
    const { pieces, showOwner } = this.props;

    const threeifiedPieces = this.threeify(pieces);

    return (
      <Grid stretched>
        {threeifiedPieces.map((collection, index) => (
          <Grid.Row
            columns={1}
            key={index}>
            <Grid.Column>
              <Card.Group
                itemsPerRow={3}
                stackable>
                <PieceCards
                  collection={collection}
                  showOwner={showOwner} />
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    );
  }
}