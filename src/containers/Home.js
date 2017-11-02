import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Item,
  Segment,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';
import MODELS from '../models';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment>
            {MODELS.map(({ singular, plural }, index) => singular !== 'piece' && (
              <Item key={index}>
                <Item.Content
                  as={Link}
                  className={`Home-link ${plural}-link`}
                  key={index}
                  to={`/${plural}/`}>
                  <Header
                    as='h1'
                    className='fancy'
                    icon={CONSTANTS.ICONS[singular]}
                    content={plural.toUpperCase()} />
                </Item.Content>
              </Item>
            ))}
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}