import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Header,
  Icon,
  Image,
  Modal,
} from 'semantic-ui-react';

export function AgeGate({ onClick }) {
  return (
    <Modal
      className='AgeGate'
      closeOnDimmerClick={false}
      defaultOpen
      dimmer
      size='fullscreen'>
      <Modal.Header
        as='h3'
        className='fancy'>
        <Image
          centered
          size='small'
          src='/logo.png' />
      </Modal.Header>
      <Modal.Content>
          <Icon
            name='warning sign'
            size='huge' />
        <Header
          as='h2'
          className='fancy'>
          Adults only
        </Header>
        Are you legally allowed to view adult content?
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          onClick={onClick}>
          <Icon name='thumbs up' /> Yes, let me in
        </Button>
        <Button
          negative
          onClick={() => (window.location.href = 'https://www.google.com/')}>
          <Icon name='thumbs down' /> No
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

AgeGate.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AgeGate;