import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Header,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';

export function MyAccount(props) {
  const {
    myAccount,
    actions: {
      link,
    },
  } = props;

  if (!myAccount) return (
    <Redirect to='/' />
  );

  const { linked, linkedAccount = {}, type } = myAccount;
  const { name } = linkedAccount;
  const accountType = CONSTANTS.ACCOUNT_TYPES[type];

  return (
    <Segment.Group>
      <Segment>
        {linked && (
          <Label
            ribbon
            color='blue'
            positon='top left'>
            <Header
              as='h3'
              className='fancy'>
              {accountType}
            </Header>
          </Label>
        )}

        <Button
          as={Link}
          pull='right'
          to='/change-password'>
          <Icon name='lock' /> Change password
        </Button>

        {accountType !== CONSTANTS.ACCOUNT_TYPES.artist && (
          <Button onClick={() => link('artist')}>
            <Icon name={CONSTANTS.ICONS.artist} /> Become an artist
          </Button>
        )}
      </Segment>
      {linked && (
        <Segment>
          <Header
            as='h4'
            className='fancy'>
              Name
          </Header>
          {name}
        </Segment>
      )}
    </Segment.Group>
  );
}

MyAccount.defaultProps = {
  myAccount: null,
  linkedAccount: {},
};

export default MyAccount;