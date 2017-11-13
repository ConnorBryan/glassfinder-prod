import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import {
  Card,
  Header,
  Image,
  Item,
  Loader,
  Segment,
} from 'semantic-ui-react';

import withPageHeader from '../components/withPageHeader';

/**
 * @func Home
 * @desc The home screen provides links to the most intrinsic content,
 *       as well as the latest news item.
 * @param {object} props 
 * @returns {Component}
 */
export function Home(props) {
  const { history, initialized } = props;

  const splashStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
  };
  const headerStyle = { marginTop: '1rem', marginBottom: '2rem' };
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

  return !initialized
    ? (
      <div style={splashStyle}>
        <Image
          size='medium'
          src='/logo.png' />
        <Loader active />
      </div>
    )
    : (
      <Segment.Group>
        <Segment attached='bottom'>
          <Header
            as='h2'
            content='Explore'
            className='fancy'
            icon='binoculars'
            style={headerStyle} />
          <Card.Group
            items={explorationCards}
            itemsPerRow={2}
            stackable />
        </Segment>
        <Segment attached='bottom'>
          <Header
            as='h2'
            content='Latest update'
            className='fancy'
            icon='newspaper'
            style={headerStyle} />
          <Item.Group>
            <Item
              className='nested'
              content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit eveniet magnam quis quam. Est fugiat veritatis sequi sit dolorem quod consectetur, sunt aperiam, nihil molestias alias, asperiores natus mollitia eaque!'
              header='Example title'
              meta='Posted by Connor Bryan on 3/19/1992' />
          </Item.Group>
        </Segment>
      </Segment.Group>
    );
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withPageHeader(Home);