import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Search,
  Segment,
} from 'semantic-ui-react';
import S from 'string';

import CONSTANTS from '../constants';
import * as Formatters from '../util/formatters';
import Pagination from '../components/Pagination';

export default class Master extends Component {
  render() {
    const {
      page,
      collectionSize: lastPage,
      type,
      actions: {
        loadPage,
      },
    } = this.props;
    const { [type]: collection } = this.props;

    const iconName = CONSTANTS.ICONS[Formatters.getModelSingular(type)];

    return (
      <Segment>
        <Segment attached='top'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header
                  as='h3'
                  className='fancy'>
                  {S(type).capitalize().s}
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Icon
                  name={iconName}
                  size='large' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment attached='top'>
          <Search />
        </Segment>
        {collection.length > 0 && (
          <Pagination
            page={page}
            lastPage={lastPage}
            loadPage={loadPage }/>
        )}
        <Segment
          attached='top'
          as={Grid}
          divided='vertically'>
          {collection.map((item, key) => (
            <Grid.Row
              as={Link}
              className='Master-item'
              key={key}
              to={`/${Formatters.getModelSingular(type)}/${item.id}`}>
              <Grid.Column width={4}>
                <Image
                  shape='circular'
                  size='tiny'
                  src={item.image} />
              </Grid.Column>
                <Grid.Column width={12}>
                  <Label
                    icon={iconName}
                    color='blue'
                    corner='right'/>
                  <Item
                    as={Link}
                    key={key}
                    to={`/${Formatters.getModelSingular(type)}/${item.id}`}>
                    <Item.Content
                      as='h3'>
                      {item.name}
                    </Item.Content>
                    <Item.Content>
                      <Icon name='map pin' /> 0.5mi
                    </Item.Content>
                    <Item.Content>
                      <Icon name='announcement' /> {item.tagline}
                    </Item.Content>
                    <Item.Content>
                      <Icon name='star' /> Rating {item.rating} / 5.00
                    </Item.Content>
                    <Item.Content>
                      <Icon name='calendar' /> Member since {item.memberSince}
                    </Item.Content>
                  </Item>
                </Grid.Column>
              </Grid.Row>
            ))}
            {!collection.length && (
              <Grid.Row textAlign='center'>
                <Grid.Column>
                    <Icon
                      name='warning sign'
                      size='massive'/>
                  
                  <Header as='h2'>
                    No {type} found. <br />
                    Please try again later.
                  </Header>
                </Grid.Column>
              </Grid.Row>
            )}
        </Segment>
        {collection.length > 0 && (
          <Pagination
            page={page}
            lastPage={lastPage}
            loadPage={loadPage}/>
        )}
      </Segment>
    );
  }
}