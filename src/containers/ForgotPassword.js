import React from 'react';

import QuickForm from '../components/QuickForm';

const forgotPasswordFormConfig = {
  icon: 'question circle',
  title: 'Forgot password',
  fields: [
    {
      control: 'input',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter email',
      error: false,
      onChange: () => alert('changed email'),
      required: true,
    },
  ],
  onSubmit: e => console.log(e) || alert('Done'),
  clear: e => alert('Clear'),
};

export function ForgotPassword(props) {
  const {
    icon,
    title,
    fields,
    onSubmit,
    clear,
  } = forgotPasswordFormConfig;

  return (
    <QuickForm
      icon={icon}
      title={title}
      fields={fields}
      onSubmit={onSubmit}
      clear={clear} />
  );
}

export default ForgotPassword;