import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Image,
} from 'semantic-ui-react';
import { formatMoney } from 'accounting';

export const makePriceLabel = price => ({
  as: 'h2',
  color: 'green',
  content: formatMoney(price),
  ribbon: 'right',
  style: { fontSize: '1.5rem' }
});

export function PieceCard(props) {
  const {
    id,
    fluid,
    raised,
    price,
    image,
    title,
    description,
    userId,
    deletePiece,
    showEdit,
    showOwner,
    showPurchase,
  } = props;

  return (
    <Card
      fluid={fluid}
      raised={raised}>
      <Image
        label={makePriceLabel(price)}
        src={image} />
      <Card.Content>
        <Card.Header>
          {title}
        </Card.Header>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
      {showOwner && userId && (
        <Card.Content extra>
          <Button
            as={Link}
            className='fancy'
            content='View owner'
            fluid
            icon='user'
            to={`/u/${userId}`} />
        </Card.Content>
      )}
      <Card.Content extra>
        <Button
          as={Link}
          className='fancy'
          content='View pics' 
          fluid
          icon='picture'
          primary
          to={`/p/${id}`} />
      </Card.Content>
      {showPurchase && (
        <Card.Content extra>
          <Button
            as={Link}
            fluid
            className='fancy'
            color='green'
            icon='dollar'
            content='Purchase'
            to={`/purchase/${id}`} />
        </Card.Content>
      )}
      {showEdit && [
        <Card.Content
          extra
          key='edit'>
          <Button
            as={Link}
            fluid
            className='fancy'
            icon='pencil'
            content='Edit'
            to={`/my-pieces/${id}`} />
        </Card.Content>,
        <Card.Content
          extra
          key='delete'>
          <Button
            className='fancy'
            color='red'
            content='Delete'
            icon='cancel'
            fluid
            onClick={() => deletePiece(id)} />
        </Card.Content>
      ]}
    </Card>
  );
}

PieceCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fluid: PropTypes.bool,
  raised: PropTypes.bool,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deletePiece: PropTypes.func,
  showEdit: PropTypes.bool,
  showOwner: PropTypes.bool,
  showPurchase: PropTypes.bool,
};

export function PieceCards(props) {
  const {
    collection,
    deletePiece,
    showEdit,
    showOwner,
    showPurchase,
  } = props;

  return collection.map((piece, index) => (
      <PieceCard
        key={index}
        fluid
        raised
        deletePiece={deletePiece}
        showEdit={showEdit}
        showOwner={showOwner}
        showPurchase={showPurchase}
        {...piece} />
  ));
}

export default PieceCards;
