import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Header,
  Segment,
} from 'semantic-ui-react';

export default class AccountField extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    fieldKey: PropTypes.string.isRequired,
    fieldValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]).isRequired,
    updateField: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    fieldValue: '',
    editable: false,
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
      editable,
    } = this.props;
    const { showingInput, newValue } = this.state;

    return (
      <Segment>
        <Header
          as='h4'
          className='fancy'>
            {title} 
            {editable && (
              <Button
                icon='pencil'
                onClick={this.toggleShowingInput} />
            )}
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
          : (
            <p>{fieldValue}</p>
          )}
      </Segment>
    );
  }
}
