import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Segment,
} from 'semantic-ui-react';
import Aux from 'react-aux';

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

  /* = = = */

  setName = ({ target: { value: name } }) => this.setState({ name });
  setDescription = ({ target: { value: description } }) => this.setState({ description });

  /* = = = */

  Stage0 = () => {
    const { name, description } = this.state;

    return (
      <Aux>
        <Form
          as={Segment}
          attached='top'>
          <Form.Input
            label='What is the name of your business?'
            type='text'
            onChange={this.setName} />
          <Form.TextArea
            label='What do you stand for?'
            onChange={this.setDescription} />
          <Form.Button
            content='Continue'
            disabled={!name || !description}
            icon='chevron right'
            onClick={this.advanceState} />
        </Form>
      </Aux>
    );
  }

  render() {
    const {
      LinkNav,
      Stage0,
      state: { stage },
    } = this;

    const stages = [
      <Stage0 />,
    ];

    return (
      <Aux>
        {stages[stage]}
      </Aux>        
    );
  }
}
