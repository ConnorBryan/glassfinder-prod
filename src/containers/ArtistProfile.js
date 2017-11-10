import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Header,
  Icon,
  Label,
  Menu,
  Segment,
} from 'semantic-ui-react';
import pathToRegexp from 'path-to-regexp';

export default class ArtistProfile extends Component {
  static propTypes = {};

  componentDidMount() {
    const {
      artistsById,
      location: { pathname },
      actions: { setActiveArtist, fetchArtist },
    } = this.props;

    const id = parseInt(pathname.split('/')[2]);
    const artist = artistsById.get(id);

    artist ? setActiveArtist(id) : fetchArtist(id);
  }

  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    const {
      activeArtist,
      artistsById,
      location: { pathname },
      actions: { fetchArtist },
    } = this.props;

    const id = parseInt(pathname.split('/')[2]);
    
    if (isNaN(id)) return (
      <Redirect to='/artists' />
    );

    const artist = artistsById.get(activeArtist);

    if (!artist) return null;

    const {
      name,
      tagline,
      image,
      from,
      description,
    } = artist;

    return (
      <div>
        {name}
        {tagline}
        {image}
        {from}
        {description}
      </div>
    );
  }
}
