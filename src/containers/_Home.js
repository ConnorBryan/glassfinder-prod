import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

export default class Home extends Component {
  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    const { mapmarkers } = nextProps;

    if (mapmarkers.length > 0) {
      this.renderMapmarkers();
    }
  }

  async initMap() {
    const {
      actions: {
        getMapmarkers,
      },
    } = this.props;
, 
    this.map = new window.google.maps.Map(
      document.getElementById('map'),
      {
        center: {
          lat: 32.770713,
          lng: -96.795438,
        },
        zoom: 14,
      }
    );

    getMapmarkers();
  }

  renderMapmarkers() {
    setTimeout(() => {

      const {
      history: { history },
      mapmarkers,
    } = this.props;

    const addedMarkers = mapmarkers.map(headshop => new window.google.maps.Marker({
      id: headshop.id,
      title: headshop.name,
      position: headshop.position,
    }));

    addedMarkers.forEach(mapmarker => {
      const { id } = mapmarker;

      mapmarker.addListener('click', () => history.push(`/headshop/${id}`));
      mapmarker.setMap(this.map);
    });

    }, 1000);
  }

  render() {
    return (
      <Segment
        raised
        id='map' />
    );
  }
}