import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Message,
  Segment,
} from 'semantic-ui-react';
import Aux from 'react-aux';

import constants from '../../../constants';

export default class ShopLink extends Component {
  constructor() {
    super();
    
    this.state = this.getInitialState();
  }

  componentWillUpdate(nextProps, nextState) {
    const { stage: currentStage } = this.state;
    const { stage: upcomingStage } = nextState;
    const shouldClearImage = currentStage !== 2 && upcomingStage === 2;

    shouldClearImage && this.setState({ image: null });
  } 

  getInitialState = () => ({
    stage: 0,
    name: '',
    description: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    image: null,
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

  startOver = () => {
    this.setState(this.getInitialState());
  }

  confirm = () => {
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
      <Aux>
        <Form.Input
        label='What is the name of your business?'
        type='text'
        onChange={this.setName}
        value={name} />
        <Form.TextArea
          label='What do you stand for?'
          onChange={this.setDescription}
          value={description} />
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
      </Aux>
    );
  }

  Stage2 = () => {
    const { image } = this.state;

    return (
      <Aux>
        <Form.Field>
          <Header
            as='h5'
            className='fancy'>
            <Icon name='file image outline' /> Upload an image
          </Header>
          <input
            type='file'
            onChange={this.setImage} />
        </Form.Field>
      </Aux>
    );
  }

  Stage3 = () => {
    const { email, phone } = this.state;

    return (
      <Aux>
        <Form.Input
          label='What is the email address for your business?'
          type='text'
          onChange={this.setEmail}
          value={email} />
        <Form.Input
          label='What is the phone number for your business?'
          type='text'
          onChange={this.setPhone}
          value={phone} />
      </Aux>
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
      <Grid divided='vertically'>
        <Grid.Row>
          <Grid.Column width={4}>
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
                  <Icon name='envelope' /> {email}
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment attached='top'>
              <Header as='h2'>
                Does this look right?
              </Header>
              If the information to the left looks good, click "Confirm" below to submit the link request. <br />
              Otherwise, click "Start over" to try again.
            </Segment>
            <Segment attached='bottom'>
              <Button.Group fluid>
                <Button
                  onClick={this.confirm}
                  positive
                  floated='right'>
                  <Icon name='checkmark' /> Confirm
                </Button>
                <Button.Or text='' />
                <Button
                  onClick={this.startOver}
                  negative
                  floated='right'>
                  <Icon name='undo' /> Start over
                </Button>
              </Button.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
      state: {
        stage,
        name,
        description,
        street,
        city,
        state,
        zip,
        image,
        email,
        phone
      },
    } = this;

    const stages = [
      <Stage0 />,
      <Stage1 />,
      <Stage2 />,
      <Stage3 />,
      <Stage4 />,
    ];

    const requirements = [
      name && description,
      street && city && state && zip,
      image,
      email && phone,
    ];
    const fulfillsRequirements = requirements[stage];

    return (
      <Aux>
        <Message icon>
          <Icon name='shop' />
          <Message.Content>
            <Message.Header>
              Linking as a shop
            </Message.Header>
            Shops can upload pieces to sell and show up on the map.
            <Button
              as={Link}
              to='/my-account'
              negative
              floated='right'>
              <Icon name='close' /> Cancel
            </Button>
          </Message.Content>
        </Message>
        <Form
          as={Segment}
          attached='top'>
          {stages[stage]}
        </Form>
        {stage !== 4 && (
          <Segment attached='bottom'>
            <Button.Group fluid>
              <Button
                disabled={stage === 0}
                onClick={this.regressState}
                floated='left'>
                <Icon name='chevron left' /> Previous
              </Button>
              <Button.Or text='' />
              <Button
                onClick={this.advanceState}
                disabled={!fulfillsRequirements}
                floated='right'>
                <Icon name='chevron right' /> Next
              </Button>
            </Button.Group>
          </Segment>
        )}
      </Aux>
    );
  }
}
