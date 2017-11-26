import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
} from 'semantic-ui-react';

export default class ShopLink extends Component {
  state = {
    stage: 0,

    // Who are you and what do you stand for?
    name: null,
    description: null,

    // Where can enthusiasts find you?
    street: null,
    city: null,
    state: null,
    zip: null,

    // Put your best foot forward.
    image: null,

    // How can enthusiasts get in touch?
    email: null,
    phone: null,
  };

  gotoStage = stage => this.setState({ stage });

  regressState = () => this.setState(prevState => {
    if (prevState.stage > 0) this.setState({ stage: prevState.stage - 1 });
  });

  advanceState = () => this.setState(prevState => {
    if (prevState.stage < 3) this.setState({ stage: prevState.stage + 1 });
  });

  submitRequest = () => {
    let requestValid = true;

    Object.values(this.state).forEach(property => {
      if (property === null) requestValid = false;
    });

    if (!requestValid) return;

    alert('Sending...');
  };

  Stage0() {
    return (
      <div>
        Stage 0
      </div>
    );
  }

  render() {
    const { Stage0 } = this;

    return (
      <Stage0 />
    );
  }
}
