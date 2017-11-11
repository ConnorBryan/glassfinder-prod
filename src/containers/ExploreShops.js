import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
  Segment,
} from 'semantic-ui-react';

import Map from '../components/Map';
import PieceCard from '../components/PieceCard';

export default class ExploreShops extends Component {
  static propTypes = {};

  componentDidMount() {
    const {
      localShops,
      actions: { exploreShops },
    } = this.props;

    if (!localShops) exploreShops();
  }
  
  render() {
    const {
      localShops,
      localShopsPage,
    } = this.props;

    return (
      <Segment>
        <Map {...this.props} />
        {localShops && localShops.map((shop, index) => {
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
            <div key={index}>
              {name}
              {image}
              {street}
              {city}
              {state}
              {zip}
              {email}
              {phone}
              {description}
            </div>
          );
        })}
      </Segment>
    );
  }
}