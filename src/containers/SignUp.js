import React from 'react';

import QuickForm from '../components/QuickForm';

export function SignUp(props) {
  const {
    history,
    actions: {
      signup,
      setSignupFormEmail,
      setSignupFormEmailAgain,
      setSignupFormPassword,
      setSignupFormPasswordAgain,
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
    onSubmit: () => {
      signup();
      history.push(`/user-verification?awaiting-verification=true`);
    },
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