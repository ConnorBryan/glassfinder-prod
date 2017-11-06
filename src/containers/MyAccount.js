import React from 'react';
import { Link } from 'react-router-dom';
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

  const {
    email,
    linked,
    type,
  } = myAccount;

  const accountType = CONSTANTS.ACCOUNT_TYPES[type];

  return (
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
  );
}

MyAccount.defaultProps = {
  myAccount: {},
};

export default MyAccount;