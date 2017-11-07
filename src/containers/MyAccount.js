import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Header,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';

export function AccountField(props) {
  const { title, field } = props;

  return (
    <Segment>
      <Header
        as='h4'
        className='fancy'>
          {title}
      </Header>
      {field}
    </Segment>
  );
}

AccountField.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

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
  const accountType = CONSTANTS.ACCOUNT_TYPES[type];

  const fields = Object
    .keys(linkedAccount)
    .map(key => ({ title: capitalize(key), field: linkedAccount[key] }));

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
      {linked && fields.map(({ title, field }, index) => (
        <AccountField
          key={index}
          title={title}
          field={field} />
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