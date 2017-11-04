import React from 'react';

import QuickForm from '../components/QuickForm';

export function SignIn(props) {
    const {
      history,
      actions: {
        signin,
        setSigninFormEmail,
        setSigninFormPassword,
      },
    } = props;

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
        onChange: ({ target: { value } }) => setSigninFormEmail(value),
        required: true,
      },
      {
        control: 'input',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        error: false,
        onChange: ({ target: { value } }) => setSigninFormPassword(value),
        required: true,
      },
    ],
    onSubmit: signin,
    extraActions: [
      {
        icon: 'question circle',
        content: 'Forgot password',
        onClick: () => history.push('/forgot-password'),
      },
    ],
  };

  const {
    icon,
    title,
    fields,
    onSubmit,
    extraActions,
  } = signinFormConfig;

  return (
    <QuickForm
      icon={icon}
      title={title}
      fields={fields}
      onSubmit={onSubmit}
      extraActions={extraActions} />
  );
}

export default SignIn;