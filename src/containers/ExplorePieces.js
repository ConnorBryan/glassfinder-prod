import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div>
        ExplorePieces
      </div>
    );
  }
}