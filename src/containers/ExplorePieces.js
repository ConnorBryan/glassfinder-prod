import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
  Segment,
} from 'semantic-ui-react';

import PieceCard from '../components/PieceCard';

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
        {localPieces && localPieces.map((piece, index) => {
          const {
            price,
            image,
            title,
            description,
          } = piece;

          return (
            <PieceCard
              key={index}
              price={price}
              image={image}
              title={title}
              description={description} />
          );
        })}
      </Segment>
    );
  }
}