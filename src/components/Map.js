import React, { Component } from 'react';
import {
  Icon,
  Grid,
  Menu,
  Segment,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';

export default class Map extends Component {
  componentDidMount() {
    window.google
      ? this.initMap()
      : (window.initMap = () => this.initMap());
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    const { localShops } = nextProps;

    if (localShops && localShops.length > 0) this.renderMapmarkers();
  }

  /**
   * @method renderMapmarkers
   * Once mapmarkers have been loaded,
   * iterate over each of them to create a new Google Map Marker.
   * Clicking the marker sends you straight to the Detail page.
   */
  renderMapmarkers() {
    const { localShops, history } = this.props;

    if (!localShops) return;

    const onClick = id => history.push(`/s/${id}`);

    localShops
      .map(({ id, name, lat, lng }) => new window.google.maps.Marker({ id, name, position: { lat, lng } }))
      .forEach(mapmarker => {
        mapmarker.addListener('click', () => onClick(mapmarker.id));
        mapmarker.setMap(this.MAP);
      });
}

  /**
   * @method initMap
   * After Google's Map library loads,
   * create an instance attached to the rendered Segment.
   */
  initMap() {
    try {
      this.MAP = new window.google.maps.Map(
        document.getElementById('map'),
        CONSTANTS.DEFAULT_MAP_CONFIG
      );
    } catch (e) {
      console.error(e);
    }

    this.renderMapmarkers();
  }

  /**
   * @method findMyLocation
   * Center the map on the user's location after requesting permission.
   */
  findMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => this.log(position.coords.latitude),
      err => console.log(err),
      { timeout: 5000 }
    );
  }
  

  log = message => console.log(message)

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column
            width={4}>
            <Menu
              fluid
              key='map-menu'
              attached='left'
              vertical>
              <Menu.Item onClick={this.findMyLocation}>
                <Icon name='map pin' /> Find my location
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment
              key='map'
              attached='right'
              id='map'
              raised />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
