import React from 'react';
import { Card, Segment } from 'semantic-ui-react';
import makeClass from 'classnames';

export function Home(props) {
  const { history } = props;

  const className = makeClass('text-center fancy');
  const onClick = url => history.push(url);

  const explorationCards = [
    {
      className,
      description: 'Explore shops',
      image: 'https://placehold.it/400x400',
      onClick: () => onClick('/explore-shops'),
    },
    {
      className,
      description: 'Explore pieces',
      image: 'https://placehold.it/400x400',
      onClick: () => onClick('/explore-pieces'),
    },
  ];

  return (
    <Segment.Group>
      <Segment attached='top'>
        <Card.Group
          items={explorationCards}
          itemsPerRow={2}
          stackable />
      </Segment>
      <Segment attached='bottom'>
      </Segment>
    </Segment.Group>
  );
}

Home.propTypes = {};

export default Home;