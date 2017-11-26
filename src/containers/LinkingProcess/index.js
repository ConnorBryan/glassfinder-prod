import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withPageHeader from '../../components/withPageHeader';
import LinkHeroes from './LinkHeroes';
import ShopLink from './ShopLink';

export class LinkingProcess extends Component {
  static Types = {
    shop: ShopLink,
  };

  state = {
    processStarted: false,
    type: null,
  };

  componentDidUpdate() {
    const { location: { pathname } } = this.props;
    const { processStarted, type: stateType } = this.state;

    if (processStarted || stateType) return;

    const type = pathname.split('/')[2];

    if (!type || !LinkingProcess.Types[type]) return;

    this.setState({
      processStarted: true,
      type,
    });
  }

  render() {
    const { type } = this.state;

    const Type = LinkingProcess.Types[type];
    const collection = [
      {
        image: 'https://placehold.it/400x400',
        linkType: 'Shop',
        description: 'As a shop, you can upload your pieces to sell and achieve visibility in our system',
        link: '/link-my-account/shop',
      },
    ];

    return type
    ? (
      <Type {...this.props} />
    )
    : (
      <LinkHeroes collection={collection} />
    );
  }
}

export default withPageHeader(LinkingProcess);
