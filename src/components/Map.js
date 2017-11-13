import React, { Component } from 'react';
import {
  Icon,
  Grid,
  Menu,
  Segment,
} from 'semantic-ui-react';
import axios from 'axios';

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
   * @desc Once mapmarkers have been loaded,
   *       iterate over each of them to create a new Google Map Marker.
   *       Clicking the marker sends you straight to the Detail page.
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
   * @desc After Google's Map library loads,
   *       create an instance attached to the rendered Segment.
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
   * @desc   Center the map on the user's location after requesting permission.
   */
  findMyLocation = async () => {
    const { data: { location } } = await (
      axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${CONSTANTS.GOOGLE_MAPS_GEOLOCATION_API_KEY}`)
    );

    this.MAP.setCenter(location);
  }
  
  render() {
    const mainStyle = {
      marginTop: 0,
      marginBottom: '2rem',
    };

    const rowStyle = {
      paddingTop: 0,
    }

    const mapStyle = {
      paddingTop: 0,
      minHeight: '300px',
    };

    const columnStyle = {
      padding: 0,
    };

    return (
      <Grid style={mainStyle}>
        <Grid.Row style={rowStyle}>
          <Grid.Column
            as={Segment}
            id='map'
            style={mapStyle}
            width={16}>
          </Grid.Column>
          <Grid.Column
            style={columnStyle}
            as={Menu}
            width={16}
            vertical>
            <Menu.Item
              className='fancy'
              onClick={this.findMyLocation}>
              <Icon name='map pin' /> Find my location
            </Menu.Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
