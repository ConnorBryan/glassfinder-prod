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
import flatten from '../utils/flatten';
import AccountField from '../components/AccountField';

export function MyAccount(props) {
  const {
    myAccount,
    actions: { link, updateField, },
  } = props;

  if (!myAccount) return (
    <Redirect to='/' />
  );
  
  const { linkedAccount = {} } = myAccount;
  const { linked, type } = flatten(myAccount);
  const accountType = CONSTANTS.ACCOUNT_TYPES[type];
  const userFields = fieldify(myAccount);
  const linkedFields = fieldify(linkedAccount);

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
      <AccountFields
        fieldset={userFields}
        updateField={updateField} />
      {linked && (
        <AccountFields
          fieldset={linkedFields}
          updateField={updateField} />
      )}
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

function fieldify(object) {
  return Object
    .keys(object)
    .map(key => ({
      title: capitalize(key),
      fieldKey: key,
      fieldValue: object[key].value,
      editable: object[key].editable,
    }));
}

function AccountFields({ fieldset, updateField }) {
  return fieldset.map((field, index) => {
    const { title, fieldKey, fieldValue, editable } = field;

    if (typeof fieldValue === 'object') return null;

    return (
      <AccountField
        key={index}
        updateField={updateField}
        title={title}
        fieldKey={fieldKey}
        fieldValue={fieldValue}
        editable={editable} />
    );
  });
}