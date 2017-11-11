import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Icon,
  Segment,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <Button.Group fluid vertical>
              <Button
                as={Link}
                className='fancy'
                fluid
                to='/explore-shops'>
                <Icon name={CONSTANTS.ICONS.shop} /> Explore shops
              </Button>
              <Button
                as={Link}
                className='fancy'
                fluid
                to='/explore-pieces'>
                <Icon name={CONSTANTS.ICONS.piece} /> Explore pieces
              </Button>
            </Button.Group>
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}