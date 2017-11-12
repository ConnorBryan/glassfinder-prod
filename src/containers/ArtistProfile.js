import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Header,
  Icon,
  Item,
  Label,
  Menu,
  Segment,
} from 'semantic-ui-react';
import pathToRegexp from 'path-to-regexp';

import CONSTANTS from '../constants';

import PieceGrid from '../components/PieceGrid';
import ArtistItem from '../components/ArtistItem';

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
    
    const headerStyle = {
      marginBottom: '2rem',
    };

    return (
      <div>
        <Label
          className='fancy'
          ribbon='left'
          color='blue'>
          <Icon name={CONSTANTS.ICONS.artist} /> Artist
        </Label>
        <Item.Group fluid>
          <ArtistItem {...artist} />
        </Item.Group>          
        <Header
          as='h2'
          icon={CONSTANTS.ICONS.piece}
          style={headerStyle}
          content='Pieces'
          className='fancy' />
        {pieces && (
          <PieceGrid pieces={pieces} />
        )}
      </div>
    );
  }
}
