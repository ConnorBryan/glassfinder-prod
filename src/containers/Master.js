import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  Grid,
  Header,
  Icon,
  Item,
  Search,
  Segment,
} from 'semantic-ui-react';
import S from 'string';

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

    return (
      <Segment>
        <Segment attached='top'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h3'>
                  {S(type).capitalize().s}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Dropdown text='Sort'>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon='star'
                      text='Rating' />
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment attached='top'>
          <Search />
        </Segment>
        {collection && collection.length && (
          <Pagination
            page={page}
            lastPage={lastPage}
            loadPage={loadPage }/>
        )}
        <Segment attached='top'>
          <Item.Group>
            {collection.map((item, key) => (
              <Item
                as={Link}
                key={key}
                to={`/${Formatters.getModelSingular(type)}/${item.id}`}>
                <Item.Content>
                  {item.name}
                </Item.Content>
                <Item.Content>
                  <Icon name='announcement' /> {item.tagline}
                </Item.Content>
                <Item.Content>
                  <Icon name='star' /> Rating {item.rating} / 5.00
                </Item.Content>
              </Item>
            ))}
            {!collection.length && (
              <Item.Content>
                <Icon name='warning sign' /> <br/>
                No {type} found. <br />
                Please try again later.
              </Item.Content>
            )}
          </Item.Group>
        </Segment>
        {collection && collection.length && (
          <Pagination
            page={page}
            lastPage={lastPage}
            loadPage={loadPage}/>
        )}
      </Segment>
    );
  }
}