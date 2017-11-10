import React from 'react';
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

export function ArtistProfile(props) {
  const {
    artistsById,
    location: { pathname },
    actions: { fetchArtist },
  } = props;

  const id = parseInt(pathname.split('/')[2]);
  
  if (isNaN(id)) return (
    <Redirect to='/artists' />
  );

  const artist = artistsById.get(id);

  if (!artist) {
    fetchArtist(id);
    
    return null;
  };

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

ArtistProfile.propTypes = {};

export default ArtistProfile;
