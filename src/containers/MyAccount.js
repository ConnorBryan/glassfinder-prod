import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Header,
  Icon,
  Label,
  Menu,
  Segment,
} from 'semantic-ui-react';
import Aux from 'react-aux';

import CONSTANTS from '../constants';
import flatten from '../utils/flatten';
import AccountField from '../components/AccountField';
import withPageHeader from '../components/withPageHeader';

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
  const shouldShowPieceOptions = accountType === CONSTANTS.ACCOUNT_TYPES.shop ||
                                  accountType ===  CONSTANTS.ACCOUNT_TYPES.artist;

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
        <Menu
          fluid
          vertical>
          <Menu.Item
            as={Link}
            pull='right'
            to='/change-password'>
            <Icon name='lock' /> Change password
          </Menu.Item>
          {shouldShowPieceOptions && (
            <Aux>
              <Menu.Item
                as={Link}
                to='/upload-piece'>
                  <Icon name={CONSTANTS.ICONS.piece} /> Upload a piece
              </Menu.Item>
              <Menu.Item
                as={Link}
                to='/my-pieces'>
                  <Icon name={CONSTANTS.ICONS.piece} /> My pieces
              </Menu.Item>
            </Aux>
          )}
          {!linked && (
            <Menu.Item
              as={Link}
              to='/link-my-account'>
                <Icon name='chain' /> Link my account
            </Menu.Item>
          )}
        </Menu>
      </Segment>
    </Segment.Group>
  );
}

MyAccount.defaultProps = {
  myAccount: null,
  linkedAccount: {},
};

export default withPageHeader(MyAccount);

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