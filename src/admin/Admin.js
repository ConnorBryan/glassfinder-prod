import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
} from 'semantic-ui-react';
import './Admin.css';

export default class Admin extends Component {
  static propTypes = {

  };

  componentDidMount() {
    const {
      actions: {
        v2CreateModel,
        v2ReadModel,
        v2ReadSomeModels,
        v2ReadAllModels,
        v2UpdateModel,
        v2DestroyModel,
      },
    } = this.props;

    v2CreateModel('users', {
      email: 'cchromium@gmail.com',
      password: 'abc123',
    });

    v2ReadModel('artist', 1);
    v2ReadSomeModels('users', [1, 2, 3]);
    v2ReadAllModels('pieces');

    v2UpdateModel('user', 1, {
      email: 'bob@bob.com',
    });

    v2DestroyModel('artist', 1);
  }

  render() {
    return (
      <Container
        className='Admin'
        fluid>
        <Segment
          attached='top'
          className='a' />
        <Segment
          attached='bottom'
          className='b' />
        <Segment
          attached='bottom'
          className='c' />
      </Container>
    );
  }
}
