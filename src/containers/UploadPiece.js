import React from 'react';

import QuickForm from '../components/QuickForm';

export function UploadPiece(props) {
  const {
    history,
    actions: {
      uploadPiece,
      setUploadPieceFormImage,
      setUploadPieceFormTitle,
      setUploadPieceFormPrice,
      setUploadPieceFormDescription,
    },
  } = props;

  const uploadPieceFormConfig = {
    icon: 'puzzle',
    title: 'Upload a piece',
    fields: [
      {
        control: 'input',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter title',
        error: false,
        onChange: ({ target: { value } }) => setUploadPieceFormTitle(value),
        required: true,
      },
      {
        control: 'input',
        type: 'number',
        label: 'Price',
        placeholder: 'Enter price',
        error: false,
        onChange: ({ target: { value } }) => setUploadPieceFormPrice(value),
        required: true,
      },
      {
        control: 'textarea',
        type: 'text',
        label: 'Description',
        placeholder: 'Enter description',
        error: false,
        onChange: ({ target: { value } }) => setUploadPieceFormDescription(value),
        required: true,
      },
    ],
    onSubmit: () => {
      uploadPiece();
      history.push(`/my-account`);
    },
  };

  const {
    icon,
    title,
    fields,
    onSubmit,
  } = uploadPieceFormConfig;

  return (
    <QuickForm
      icon={icon}
      title={title}
      fields={fields}
      onSubmit={onSubmit} />
  );
}

export default UploadPiece;