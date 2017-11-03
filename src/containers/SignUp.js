import React from 'react';

import QuickForm from '../components/QuickForm';

export function SignUp(props) {
  const {
    actions: {
      signup,
      setSignupFormEmail,
      setSignupFormEmailAgain,
      setSignupFormPassword,
      setSignupFormPasswordAgain,
      setSignupFormError,
    },
  } = props;

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
        onChange: ({ target: { value } }) => setSignupFormEmail(value),
        required: true,
      },
      {
        control: 'input',
        type: 'email',
        label: 'Email again',
        placeholder: 'Enter email again',
        error: false,
        onChange: ({ target: { value } }) => setSignupFormEmailAgain(value),
        required: true,
      },
      {
        control: 'input',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        error: false,
        onChange: ({ target: { value } }) => setSignupFormPassword(value),
        required: true,
      },
      {
        control: 'input',
        type: 'password',
        label: 'Password again',
        placeholder: 'Enter password again',
        error: false,
        onChange: ({ target: { value } }) => setSignupFormPasswordAgain(value),
        required: true,
      },
    ],
    onSubmit: signup,
  };

  const {
    icon,
    title,
    fields,
    onSubmit,
  } = signupFormConfig;

  return (
    <QuickForm
      icon={icon}
      title={title}
      fields={fields}
      onSubmit={onSubmit} />
  );
}

export default SignUp;