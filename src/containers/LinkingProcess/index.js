import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withPageHeader from '../../components/withPageHeader';
import LinkHeroes from './LinkHeroes';

/*
  The linking process:
    1. The user selects '


*/

export class LinkingProcess extends Component {
  render() {
    const collection = [
      {
        image: 'https://placehold.it/400x400',
        linkType: 'Shop',
        description: 'As a shop, you can upload your pieces to sell and achieve visibility in our system',
        link: '/link-my-account/shop',
      },
    ];

    return (
      <div>
        <LinkHeroes collection={collection} />
      </div>
    );
  }
}

export default withPageHeader(LinkingProcess);
