import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
  Icon,
  Header,
  Form,
} from 'semantic-ui-react';

export function QuickForm(props) {
  const {
    icon,
    title,
    fields,
    onSubmit,
    sendButtonIcon,
    sendButtonContent,
    extraActions,
  } = props;
  
  return (
    <Segment className='QuickForm'>
      <Header
        as='h3'
        className='fancy'>
          {icon && (
            <Icon name={icon} />
          )} {title}
      </Header>
      <Form onSubmit={onSubmit}>
          {fields.map((field, index) => {
            const {
              control,
              type,
              label,
              placeholder,
              error,
              onChange,
              required,
            } = field;

            return (
              <Form.Field
                key={index}
                control={control}
                type={type}
                label={label}
                placeholder={placeholder}
                error={error}
                onChange={onChange}
                required={required} />
            );
          })}
          <Form.Group unstackable>
            <Form.Field width={8} />
            <Form.Button
              content={sendButtonContent}
              icon={sendButtonIcon}
              fluid
              primary
              type='submit'
              width={8} />
              {extraActions.map(({ content, icon, onClick }, index) => (
                <Form.Button
                  fluid
                  content={content}
                  icon={icon}
                  key={index}
                  onClick={onClick}
                  width={16} />
              ))}
          </Form.Group>
      </Form>
    </Segment>
  );
}

QuickForm.propTypes = {
  control: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
  clear: PropTypes.func,
  sendButtonIcon: PropTypes.string,
  sendButtonContent: PropTypes.string,
  extraActions: PropTypes.arrayOf(PropTypes.object),
};

QuickForm.defaultProps = {
  control: 'input',
  icon: '',
  title: '',
  fields: [],
  onSubmit: () => {},
  clear: () => {},
  sendButtonIcon: 'share square',
  sendButtonContent: 'Send',
  extraActions: [],
};

export default QuickForm;