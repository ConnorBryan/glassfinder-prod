import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
  Segment,
} from 'semantic-ui-react';

import Map from '../components/Map';
import ShopItems from '../components/ShopItem';

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
      history,
    } = this.props;

    return (
      <Segment>
        <Map {...this.props} />
        {localShops && (
          <ShopItems
            collection={localShops}
            history={history} />
        )}
      </Segment>
    );
  }
}