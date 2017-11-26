import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Form,
  Header,
  Icon,
  Image,
  Label,
  Segment,
} from 'semantic-ui-react';

export default class ShopLink extends Component {
  constructor() {
    super();
    
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
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
  });

  gotoStage = stage => this.setState({ stage });

  regressState = () => this.setState(prevState => {
    if (prevState.stage > 0) return { stage: prevState.stage - 1 };
  });

  advanceState = () => this.setState(prevState => {
    if (prevState.stage < 4) return { stage: prevState.stage + 1 };
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

  setImage = ({ target: { files } }) => this.setState({ image: files[0] });

  setEmail = ({ target: { value: email } }) => this.setState({ email });
  setPhone = ({ target: { value: phone } }) => this.setState({ phone });

  /* = = = */
  
  Stage0 = () => {
    const { name, description } = this.state;

    return (
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
      <Form
        as={Segment}
        attached='top'>
        <Form.Input
          label='Street'
          type='text'
          onChange={this.setStreet} />
        <Form.Input
          label='City'
          type='text'
          onChange={this.setCity} />
        <Form.Input
          label='State'
          type='text'
          onChange={this.setStateCode} />
        <Form.Input
          label='ZIP'
          type='number'
          max='99999'
          onChange={this.setZip} />
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
    );
  }

  Stage2 = () => {
    const { image } = this.state;

    return (
      <Form>
        <Form.Field>
          <Header
            as='h3'
            content='Upload a file' />
          <input
            type='file'
            onChange={this.setImage}/>
        </Form.Field>
        <Form.Button
          content='Previous'
          icon='chevron left'
          onClick={this.regressState} />
        {image && (
          <Form.Button
            content='Next'
            icon='chevron right'
            onClick={this.advanceState} />
        )}
      </Form>
    );
  }

  Stage3 = () => {
    const { email, phone } = this.state;

    return (
      <Form>
        <Form.Input
          label='What is the email address for your business?'
          type='text'
          onChange={this.setEmail} />
        <Form.Input
          label='What is the phone number for your business?'
          type='text'
          onChange={this.setPhone} />
        <Form.Button
          content='Previous'
          icon='chevron left'
          onClick={this.regressState} />
        {email && phone && (
          <Form.Button
            content='Next'
            icon='chevron right'
            onClick={this.advanceState} />
        )}
      </Form>
    );
  }

  Stage4 = () => {
    const {
      name,
      description,
      street,
      city,
      state,
      zip,
      image,
      email,
      phone,
    } = this.state;

    return (
      <Card.Group>
        <Card>
          <Image src='https://placehold.it/400x400' />
          <Card.Content>
            <Card.Header>
              {name}
            </Card.Header>
            <Card.Description>
              {description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card.Description>
              {street} {city}, {state} {zip}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='phone' /> {phone}
          </Card.Content>
          <Card.Content extra>
            <Icon name='phone' /> {email}
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }

  /* = = = */

  render() {
    const {
      Stage0,
      Stage1,
      Stage2,
      Stage3,
      Stage4,
      state: { stage },
    } = this;

    const stages = [
      <Stage0 />,
      <Stage1 />,
      <Stage2 />,
      <Stage3 />,
      <Stage4 />,
    ];

    return stages[stage];
  }
}
