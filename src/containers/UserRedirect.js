import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import axios from 'axios';

import CONSTANTS from '../constants';

export default class UserRedirect extends Component {
  componentDidMount() {
    const { location: { pathname } } = this.props;

    const id = parseInt(pathname.split('/')[2]);

    this.redirect(id);
  }

  async redirect(id) {
    const { history } = this.props;

    const { data: { type, id: redirectId } } = await (
      axios.get(`${CONSTANTS.API_ROOT}/users/find-linked?id=${id}`)
    );

    switch (type) {
      case 'artist': return history.push(`/a/${redirectId}`);
      default: return history.push('/');
    }
  }

  render() {
    return (
      <Loader active />
    );
  }
}