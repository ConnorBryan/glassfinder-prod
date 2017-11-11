import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Header,
  Icon,
  Label,
  Menu,
  Segment,
} from 'semantic-ui-react';
import pathToRegexp from 'path-to-regexp';

import PieceCard from '../components/PieceCard';

export default class ArtistProfile extends Component {
  static propTypes = {};

  componentDidMount() {
    const {
      artistsById,
      location: { pathname },
      actions: { setActiveArtist, fetchArtist },
    } = this.props;

    const id = parseInt(pathname.split('/')[2]);
    const artist = artistsById.get(id);

    artist ? setActiveArtist(id) : fetchArtist(id);
  }

  hydratePieces(pieceIds) {
    const {
      piecesById,
      fetchingPieces,
      actions: { fetchPieces },
    } = this.props;

    const pieces = pieceIds.map(id => piecesById.get(id)).filter(x => x);
    const missingPieces = pieceIds.filter(id => !piecesById.get(id));

    if (missingPieces.length > 0 && !fetchingPieces) fetchPieces(missingPieces);

    return pieces.length > 0 ? pieces : null;
  }
  
  render() {
    const {
      activeArtist,
      artistsById,
      location: { pathname },
      actions: { fetchArtist },
    } = this.props;

    const id = parseInt(pathname.split('/')[2]);
    
    if (isNaN(id)) return (
      <Redirect to='/artists' />
    );

    const artist = artistsById.get(activeArtist);

    if (!artist) return null;

    const { pieces: pieceIds } = artist;
    const pieces = this.hydratePieces(pieceIds);

    const {
      name,
      tagline,
      image,
      from,
      description,
    } = artist;

    return (
      <div>
        {name}
        {tagline}
        {image}
        {from}
        {description}

        <h2>Pieces</h2>
        {pieces && pieces.map((piece, index) => {
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
      </div>
    );
  }
}
