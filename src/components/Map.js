import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import CONSTANTS from '../constants';
import * as Formatters from '../util/formatters';

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
    const { mapmarkers } = nextProps;

    if (mapmarkers.length > 0) this.renderMapmarkers();
  }

  /**
   * @method renderMapmarkers
   * Once mapmarkers have been loaded,
   * iterate over each of them to create a new Google Map Marker.
   * Clicking the marker sends you straight to the Detail page.
   */
  renderMapmarkers() {
    const { history, mapmarkers, modelType } = this.props;

    const onClick = id => history.push(`/${Formatters.getModelSingular(modelType)}/${id}`);

    mapmarkers
      .map(({ id, name, position }) => new window.google.maps.Marker({ id, name, position }))
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
    const { actions: { getMapmarkers } } = this.props;

    this.MAP = new window.google.maps.Map(
      document.getElementById('map'),
      CONSTANTS.DEFAULT_MAP_CONFIG
    );
    
    getMapmarkers();
  }

  render() {
    return (
      <Segment
        id='map'
        raised />
    );
  }
}