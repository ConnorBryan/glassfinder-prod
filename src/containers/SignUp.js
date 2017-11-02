import React from 'react';

import QuickForm from '../components/QuickForm';

const signupFormConfig = {
  icon: 'user plus',
  title: 'Sign up',
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
    {
      control: 'input',
      type: 'email',
      label: 'Email again',
      placeholder: 'Enter email again',
      error: false,
      onChange: () => alert('changed email'),
      required: true,
    },
    {
      control: 'input',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter password',
      error: false,
      onChange: () => alert('changed password'),
      required: true,
    },
    {
      control: 'input',
      type: 'password',
      label: 'Password again',
      placeholder: 'Enter password again',
      error: false,
      onChange: () => alert('changed password'),
      required: true,
    },
  ],
  onSubmit: e => console.log(e) || alert('Done'),
  clear: e => alert('Clear'),
};

export function SignUp(props) {
  const {
    icon,
    title,
    fields,
    onSubmit,
    clear,
  } = signupFormConfig;

  return (
    <QuickForm
      icon={icon}
      title={title}
      fields={fields}
      onSubmit={onSubmit}
      clear={clear} />
  );
}

export default SignUp;