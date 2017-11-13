import React from 'react';

import QuickForm from '../components/QuickForm';

export function EditPiece(props) {
  const {
    history,
    myAccount: { pieces },
    location: { pathname },
    actions: {
      editPiece,
      setEditPieceFormTitle,
      setEditPieceFormPrice,
      setEditPieceFormDescription,
    },
  } = props;

  const id = parseInt(pathname.split('/')[2], 10);
  const piece = pieces.find(({ id }) => id) || {};

  const editPieceFormConfig = {
    icon: 'pencil',
    title: 'Edit a piece',
    fields: [
      {
        control: 'input',
        type: 'text',
        label: 'Title',
        placeholder: piece.title,
        error: false,
        onChange: ({ target: { value } }) => setEditPieceFormTitle(value),
      },
      {
        control: 'input',
        type: 'number',
        label: 'Price',
        placeholder: piece.price,
        error: false,
        onChange: ({ target: { value } }) => setEditPieceFormPrice(value),
      },
      {
        control: 'textarea',
        type: 'text',
        label: 'Description',
        placeholder: piece.description,
        error: false,
        onChange: ({ target: { value } }) => setEditPieceFormDescription(value),
      },
    ],
    onSubmit: () => {
      editPiece(id);
      history.push(`/my-pieces`);
    },
  };

  return (
    <QuickForm {...editPieceFormConfig} />
  );
}

export default EditPiece;