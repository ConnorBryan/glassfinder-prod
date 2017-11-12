import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import Map from '../components/Map';
import ShopItems from '../components/ShopItem';

export default class ExploreShops extends Component {
  static propTypes = {
    localShops: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.objectOf(PropTypes.func),
  };

  static defaultProps = {
    localShops: [],
    actions: {},
  };

  componentDidMount() {
    const {
      localShops,
      actions: { exploreShops },
    } = this.props;

    if (localShops.length === 0) exploreShops();
  }
  
  render() {
    const {
      localShops,
      history,
    } = this.props;

    const mainStyle = {
      paddingTop: 0,
    };

    return (
      <Segment style={mainStyle}>
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