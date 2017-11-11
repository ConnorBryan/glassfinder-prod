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

export default class ShopProfile extends Component {
  static propTypes = {};

  componentDidMount() {
    const {
      shopsById,
      location: { pathname },
      actions: { setActiveShop, fetchShop },
    } = this.props;

    const id = parseInt(pathname.split('/')[2]);
    const shop = shopsById.get(id);

    shop ? setActiveShop(id) : fetchShop(id);
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
      activeShop,
      shopsById,
      location: { pathname },
      actions: { fetchShop },
    } = this.props;

    const id = parseInt(pathname.split('/')[2]);
    
    if (isNaN(id)) return (
      <Redirect to='/shops' />
    );

    const shop = shopsById.get(activeShop);

    if (!activeShop) return null;

    const { pieces: pieceIds } = shop;
    const pieces = this.hydratePieces(pieceIds);

    const {
      name,
      image,
      street,
      city,
      state,
      zip,
      email,
      phone,
      description,
    } = shop;

    return (
      <div>
        {name}
        {image}
        {street}
        {city}
        {state}
        {zip}
        {email}
        {phone}
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
