import React from 'react';

import QuickForm from '../components/QuickForm';

export function ChangePassword(props) {
  const {
    history,
    actions: {
      changePassword,
      setChangePasswordFormPassword,
      setChangePasswordFormPasswordAgain,
    },
  } = props;

  const changePasswordFormConfig = {
    icon: 'lock',
    title: 'Change password',
    fields: [
      {
        control: 'input',
        type: 'password',
        label: 'New password',
        placeholder: 'Enter password',
        error: false,
        onChange: ({ target: { value } }) => setChangePasswordFormPassword(value),
        required: true,
      },
      {
        control: 'input',
        type: 'password',
        label: 'New password again',
        placeholder: 'Enter password again',
        error: false,
        onChange: ({ target: { value } }) => setChangePasswordFormPasswordAgain(value),
        required: true,
      },
    ],
    onSubmit: () => changePassword(history),
  };

  const {
    icon,
    title,
    fields,
    onSubmit,
  } = changePasswordFormConfig;

  return (
    <QuickForm
      icon={icon}
      title={title}
      fields={fields}
      onSubmit={onSubmit} />
  );
}

export default ChangePassword;