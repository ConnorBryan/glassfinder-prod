import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Header,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';
import AccountField from '../components/AccountField';

export function MyAccount(props) {
  const {
    myAccount,
    actions: { link, updateField, },
  } = props;

  if (!myAccount) return (
    <Redirect to='/' />
  );

  const { linked, linkedAccount = {}, type } = myAccount;
  const accountType = CONSTANTS.ACCOUNT_TYPES[type];

  const fields = Object
    .keys(linkedAccount)
    .map(key => ({
      title: capitalize(key),
      fieldKey: key,
      fieldValue: linkedAccount[key],
    }));

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
      {linked && fields.map(({ title, fieldKey, fieldValue }, index) => (
        <AccountField
          key={index}
          updateField={updateField}
          title={title}
          fieldKey={fieldKey}
          fieldValue={fieldValue} />
      ))}
    </Segment.Group>
  );
}

MyAccount.defaultProps = {
  myAccount: null,
  linkedAccount: {},
};

export default MyAccount;

/* = = = */

function capitalize(string) {
  return string
    .split('')
    .map((l, i) => i === 0 ? l.toUpperCase() : l)
    .join('');
}