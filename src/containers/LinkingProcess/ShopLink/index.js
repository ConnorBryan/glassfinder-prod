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
    name: '',
    description: '',

    // Where can enthusiasts find you?
    street: '',
    city: '',
    state: '',
    zip: '',

    // Put your best foot forward.
    image: '',

    // How can enthusiasts get in touch?
    email: '',
    phone: '',
  };

  gotoStage = stage => this.setState({ stage });

  regressState = () => this.setState(prevState => {
    if (prevState.stage > 0) return { stage: prevState.stage - 1 };
  });

  advanceState = () => this.setState(prevState => {
    if (prevState.stage < 3) return { stage: prevState.stage + 1 };
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

  setStreet = ({ target: { value: street } }) => this.setState({ street });
  setCity = ({ target: { value: city } }) => this.setState({ city });
  setStateCode = ({ target: { value: state } }) => this.setState({ state });
  setZip = ({ target: { value: zip } }) => this.setState({ zip });

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

  Stage1 = () => {
    const {
      street,
      city,
      state,
      zip,
    } = this.state;

    return (
      <Aux>
        <Form
          as={Segment}
          attached='top'>
          <Form.Input
            label='Street'
            type='text'
            onChange={this.setStreet}
            value={street} />
          <Form.Input
            label='City'
            type='text'
            onChange={this.setCity}
            value={city} />
          <Form.Input
            label='State'
            type='text'
            onChange={this.setStateCode}
            value={state} />
          <Form.Input
            label='ZIP'
            type='number'
            max='99999'
            onChange={this.setZip}
            value={zip} />
          <Form.Button
            content='Previous'
            icon='chevron left'
            onClick={this.regressState} />
          {street && city && state && zip && (
            <Form.Button
              content='Next'
              icon='chevron right'
              onClick={this.advanceState} />
          )}
        </Form>
      </Aux>
    );
  }

  render() {
    const {
      Stage0,
      Stage1,
      state: { stage },
    } = this;

    const stages = [
      <Stage0 />,
      <Stage1 />,
    ];

    return (
      <Aux>
        {stages[stage]}
      </Aux>        
    );
  }
}
