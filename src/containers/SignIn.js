import React from 'react';

import QuickForm from '../components/QuickForm';

export function SignIn({ history }) {
  const signinFormConfig = {
    icon: 'sign in',
    title: 'Sign in',
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
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        error: false,
        onChange: () => alert('changed password'),
        required: true,
      },
    ],
    onSubmit: e => console.log(e) || alert('Done'),
    clear: e => alert('Clear'),
    extraActions: [
      {
        icon: 'question circle',
        content: 'Forgot password',
        onClick: () => console.log(history) || history.push('/forgot-password'),
      },
    ],
  };

  const {
    icon,
    title,
    fields,
    onSubmit,
    clear,
    extraActions,
  } = signinFormConfig;

  return (
    <QuickForm
      icon={icon}
      title={title}
      fields={fields}
      onSubmit={onSubmit}
      clear={clear}
      extraActions={extraActions} />
  );
}

export default SignIn;