import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Icon,
} from 'semantic-ui-react';

export function MyAccount(props) {
  return (
    <div>
      <Button
        as={Link}
        to='/change-password'>
        <Icon name='lock' /> Change Password
      </Button>
    </div>
  );
}

export default MyAccount;