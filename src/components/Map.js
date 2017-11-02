import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Container,
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Segment,  
} from 'semantic-ui-react';

import CONSTANTS from '../constants';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }  
  componentDidMount() {
    window.google
      ? this.initMap()
      : (window.initMap = () => this.initMap());
  }

  shouldComponentUpdate() {
    return false;
  }

  async initMap() {
    this.MAP = new window.google.maps.Map(document.getElementById('map'), CONSTANTS.DEFAULT_MAP_CONFIG);
  }

  render() {
    return (
      <Segment
        id='map'
        raised />
    );
  }
}