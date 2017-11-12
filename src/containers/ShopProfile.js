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
import { ShopItem } from '../components/ShopItem';

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
      history,
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
        <Label
          className='fancy'
          ribbon='left'
          color='blue'>
          <Icon name={CONSTANTS.ICONS.shop} /> Shop
        </Label>
        <Item.Group fluid>
          <ShopItem
            history={history}
            {...shop} />
        </Item.Group>
        <Header
          as='h2'
          icon={CONSTANTS.ICONS.piece}
          content='Pieces'
          className='fancy' />
        {pieces && (
          <PieceGrid pieces={pieces} />
        )}
      </div>
    );
  }
}
