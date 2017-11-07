import React, { Component } from 'react';
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

export class AccountField extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    fieldKey: PropTypes.string.isRequired,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    updateField: PropTypes.func.isRequired,
  };

  state = { showingInput: false, newValue: this.props.fieldValue };

  toggleShowingInput = () => this.setState(prevState => ({ showingInput: !prevState.showingInput }));

  updateValue = ({ target: { value: newValue } }) => this.setState({ newValue });

  render() {
    const {
      title,
      fieldKey,
      fieldValue,
      updateField,
    } = this.props;
    const { showingInput, newValue } = this.state;

    return (
      <Segment>
        <Header
          as='h4'
          className='fancy'>
            {title} 
            <Button
              icon='pencil'
              onClick={this.toggleShowingInput} />
        </Header>
        {showingInput
          ? [
            <input
              key='input'
              type='text'
              value={newValue}
              onChange={this.updateValue} />,
            <Button
              key='button'
              icon='send'
              onClick={() => this.toggleShowingInput() || updateField(fieldKey, newValue)} />
          ]
          : fieldValue}
      </Segment>
    );
  }
}

export function MyAccount(props) {
  const {
    myAccount,
    actions: {
      link,
      updateField,
    },
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