import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Container,
  Header,
  Icon,
  Item,
  Menu,
  Segment,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';
import MODELS from '../models';

const menu =       <Menu
        className='Home'
        fluid
        vertical
        widths={3}>
        {MODELS.map(({ singular, plural }, index) => singular !== 'piece' && (
          <Card.Content>
            as={Link}
            key={index}
            to={`/${plural}/`}>
            <Header
              as='h1'
              className='fancy'
              icon={CONSTANTS.ICONS[singular]}
              content={plural.toUpperCase()} />
          </Card.Content>
        ))}
      </Menu>;

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
                  extra
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