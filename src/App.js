import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import axios from 'axios';

import './App.css';

import {
  Button,
  Container,
  Dropdown,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Search,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

const iconMap = {
  Headshop: 'building',
  Artist: 'user circle',
  Piece: 'puzzle',
};

// Pluralize the icon map.
Object.keys(iconMap).forEach(key => (iconMap[`${key}s`] = iconMap[key]));

function Bar(props) {
  const {
    attached,
    children,
    items
  } = props;

  return (
    <Menu
      attached={attached}
      items={items}
      inverted
      {...props}>
      {children}
    </Menu>
  );
}

function TopBar(props) {
  const items = [
    {
      key: 0,
      as: Link,
      className: 'fancy',
      to: '/',
      header: true,
      content: 'Glassfinder',
      onClick: props.hideAllViews
    }
  ];

  return (
    <Bar
      className='Bar'
      attached='top'
      items={items} />
  );
}

function BottomBar(props) {
  const {
    toggleLeftMenu,
    toggleRightView,
    showLeftMenu,
    showRightView,
  } = props;

  return (
    <Bar
      className='Bar'
      attached='bottom'>
      <Menu.Item
        active={showLeftMenu}
        onClick={toggleLeftMenu}
        className='fancy'>
        <Icon name='bars' /> Navigation
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item
          active={showRightView}
          onClick={toggleRightView}
          className='fancy'>
          <Icon name='ellipsis horizontal' /> Details
        </Menu.Item>
      </Menu.Menu>
    </Bar>
  );
}

function Map(props) {
  return (
    <Segment
      id='map' />
  );
}

function Wrapper(props) {
  return (
    <Container
      className='wrapper'
      fluid>
      {props.children}
    </Container>
  );
}

function View(props) {
  const {
    as,
    children,
    className,
    direction,
    visible
  } = props;

  return (
    <Sidebar
      as={as}
      animation='overlay'
      className={`transparent ${className}`}
      width='thin'
      direction={direction}
      visible={visible}
      vertical
      inverted>
      {children}
    </Sidebar>
  );
}

function TopMenu(props) {
  const { visible } = props;
  
  return (
    <View
      as={Menu}
      direction='top'
      visible={visible}>
      <Menu.Item>
        TopMenu
      </Menu.Item>
    </View>
  );
}

function LeftMenu(props) {
  const {
    history,
    visible,
    toggleRightView,
  } = props;

  return (
    <View
      as={Menu}
      className='thirty-percent-width'
      direction='left'
      divided
      visible={visible}>
      <Menu.Item
        className='fancy'
        header>
        <Icon name='bars' /> Navigation
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/headshops'>
        <Header
          as='h1'
          className='fancy white'>
          <Icon name='building' /> Headshops
        </Header>
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/artists'>
        <Header
          as='h1'
          className='fancy white'>
          <Icon name='user circle' /> Artists
        </Header>
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/pieces'>
        <Header
          as='h1'
          className='fancy white'>
          <Icon name='puzzle' /> Pieces
        </Header>
      </Menu.Item>
    </View>
  );
}

function Master(props) {
  const {
    accessor,
    collection,
    path,
    title,
    onClick,
  } = props;

  const _collection = props[collection];

  if (!_collection) return null;

  const normalized = _collection.map(tuple => tuple[1]);
  const resultified = normalized.map((item, index) => {
    const {
      name,
      tagline,
    } = item;

    return {
      key: index,
      title: name,
      description: tagline,
      onClick: () => onClick(item),
    };
  });

  return [
    <Segment
      key='segment'
      className='no-margin'
      inverted>
      <Menu
        inverted
        widths={2}>
        <Menu.Item
          as='h2'
          className='fancy'>
          <Icon name={iconMap[title]} /> {title}
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Search
              input='text'
              results={resultified}
              aligned='right' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>,
    <Menu
      key='menu'
      inverted
      fluid
      vertical
      className='no-margin transparent'>
      {normalized.map((item, index) => (
        <Menu.Item
          key={index}
          as={Link}
          to={`/${path}/${item.id}`}
          content={item.name}
          onClick={() => onClick(item)}>
          <Item.Header>
            {item.name}
          </Item.Header>
          <Item.Content>
            <Icon name='talk' /> {item.tagline}
          </Item.Content>
          <Item.Content>
            <Icon name='flag' /> {item.address.city}, {item.address.state}
          </Item.Content>
          {item.memberSince && (
            <Item.Content>
              <Icon name='calendar' /> Member since {item.memberSince}
            </Item.Content>
          )}
          <Item.Content>
            <Label style={{ width: '5rem' }} attached='left' ribbon color='blue'>
              <Icon name='empty star' /> Rating {item.rating}
            </Label>
          </Item.Content>
        </Menu.Item>
      ))}
    </Menu>
  ];
}

function HeadshopsList(props) {
  const {
    headshops,
    setHeadshop,
    getHeadshops,
  } = props;

  if (!headshops.length) getHeadshops();

  return (
    <Master
      accessor='headshop'
      collection='headshops'
      path='headshop'
      title='Headshops'
      onClick={setHeadshop}
      {...props} />
  );
}

function ArtistsList(props) {
  const {
    artists,
    setArtist,
    getArtists,
  } = props;

  if (!artists.length) getArtists();

  return (
    <Master
      collection='artists'
      path='artist'
      title='Artists'
      onClick={setArtist}
      {...props} />
  );
}

function PiecesList(props) {
  const {
    pieces,
    setPiece,
    getPieces,
  } = props;

  if (!pieces.length) getPieces();

  return (
    <Master
      collection='pieces'
      path='piece'
      title='Pieces'
      onClick={setPiece}
      {...props} />
  );
}

function Detail(props) {
  const {
    accessor,
    title,
    setPiece,
  } = props;
  const model = props[accessor];

  const {
    image,
    images,
    name,
    address: {
      city,
      state,
    },
    tagline,
    memberSince,
    rating,
    phone,
    email,
    description,
    owner,
    price,
    pieces,
  } = model;

  const sliderPieces = pieces
    ? pieces.map(piece => ({
      id: piece.id,
      src: piece.image,
      onClick: id => setPiece(piece),
    }))
    : [];

  const sliderImages = images
    ? images.map((image, index) => ({
      id: 0,
      src: image,
      onClick: () => {}
    }))
    : [];

  return (
    <Segment
      inverted
      className='transparent Detail'
      attached='top'>
      <Label ribbon>
        <Header as='h2'>
          {name}
          <Header.Subheader className='fancy'>
            <Icon name={iconMap[title]} /> {title}
          </Header.Subheader>
        </Header>
      </Label>
      <Item.Group divided>
        <Item>
          <Item.Image
            shape='circular'
            src={image}
            size='small' />
          <Item.Content>
            <Item.Header className='white'>
              <Icon name='talk' /> {tagline}
            </Item.Header>
            <Item.Description className='white'>
              <Icon name='flag' /> {city}, {state}
              <Label style={{ marginLeft: '1rem' }}>
                <Icon name='map pin' /> Show on map
              </Label>
            </Item.Description>
            <Item.Extra>
              {memberSince && (
                <Label>
                  <Icon name='calendar' /> Member since {memberSince}
                </Label>
              )}
              {price && (
                <Label color='green'>
                  <Icon name='dollar' />  {price}
                </Label>
              )}
              <Label color='blue'>
                <Icon name='empty star' /> Rating {rating}
              </Label>
            </Item.Extra>
          </Item.Content>
        </Item>
        <Item>
          <Menu
            inverted
            className='transparent'>
            {owner && (
              <Menu.Item>
                <Icon name='drivers license outline' /> Owned by {owner}
              </Menu.Item>
            )}
            <Menu.Item>
              <Icon name='phone square' /> {phone}
            </Menu.Item>
            <Menu.Item>
              <Icon name='envelope' /> {email}
            </Menu.Item>
          </Menu>
        </Item>
        <Item>
          <Item.Content>
            {description}
          </Item.Content>
        </Item>
        <Item.Group className='fancy'>
          {accessor !== 'piece' && [
            <Item key='pieces-header'>
              <Item.Header
                as='h4'
                className='fancy'>
                <Icon name='puzzle' /> Pieces
              </Item.Header>
              <Item.Content>
                <Button floated='right'>
                  <Icon name='eye' />  View all pieces
                </Button>
              </Item.Content>
            </Item>,
            <Item key='pieces-content'>
              <Item.Content>
                {sliderPieces.length > 0 && (
                  <Slider
                    images={sliderPieces}
                    imageEffects={{ cursor: 'pointer' }} />
                )}
              </Item.Content>
            </Item>
          ]}
          <Item>
            <Item.Header
              as='h4'
              className='fancy'>
              <Icon name='image' /> Images
            </Item.Header>
            <Item.Content>
              <Button floated='right'>
                <Icon name='eye' /> View all images
              </Button>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              {sliderImages.length > 0 && (
                <Slider images={sliderImages} />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Item.Group>
    </Segment>
  );
}

function Headshop(props) {
  if (!props.headshop) return null;

  return (
    <Detail
      accessor='headshop'
      title='Headshop'
      {...props} />
  );
}

function Artist(props) {
  if (!props.artist) return null;

  return (
    <Detail
      accessor='artist'
      title='Artist'
      {...props} />
  );
}

function Piece(props) {
  if (!props.piece) return null;

  return (
    <Detail
      accessor='piece'
      title='Piece'
      {...props} />
  );
}

function RightView(props) {
  const {
    visible,

    headshops,
    artists,
    pieces,

    getHeadshops,
    getArtists,
    getPieces,
  } = props;

  return (
    <View
      as={Segment}
      className='fifty-percent-width no-padding RightView'
      direction='right'
      visible={visible}>
      <Switch>
        <Route
          exact
          path='/'
          render={null} />
        <Route
          exact
          path='/headshops'
          render={() => <HeadshopsList headshops={headshops} getHeadshops={getHeadshops} {...props} />} />
        <Route
          exact
          path='/artists'
          render={() => <ArtistsList artists={artists} getArtists={getArtists} {...props} />} />
        <Route
          exact
          path='/pieces'
          render={() => <PiecesList pieces={pieces} getPieces={getPieces} {...props} />} />
        <Route
          exact
          path='/headshop/:id'
          render={() => <Headshop {...props} />} />
        <Route
          exact
          path='/artist/:id'
          render={() => <Artist {...props} />} />
        <Route
          exact
          path='/piece/:id'
          render={() => <Piece {...props} />} />        
      </Switch>
    </View>
  );
}

function BottomView(props) {
  const { visible } = props;

  return (
    <View
      as={Segment}
      className='no-padding'
      direction='bottom'
      visible={visible}>
      BottomView
    </View>
  );
}

function Slider(props) {
  const { images, imageEffects } = props;

  return (
    <Image.Group
      className='Slider'
      size='small'>
      {images.map((image, index) => (
        <Image
          key={index}
          style={imageEffects}
          onClick={e => image.onClick(image.id)}
          src={image.src} />
      ))}
    </Image.Group>
  );
}

const INITIAL_STATE = {
  /* User */
  activeUser: null,

  /* Menus and Views */
  showTopMenu: false,
  showLeftMenu: false,
  showRightView: false,
  showBottomView: false,

  /* Data */
  data: {
    headshops: [],
    artists: [],
    pieces: [],
  },

  /* Models */
  models: {
    headshop: null,
    artist: null,
    piece: null,
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    const { location: { pathname } } = props;

    this.state = {
      ...INITIAL_STATE,
      previousPath: pathname,
    };
  }

  componentDidMount() {
    window.google
      ? this.initMap()
      : (window.initMap = () => this.initMap());
  }

  componentDidUpdate() {
    const { location: { pathname } } = this.props;
    const { previousPath } = this.state;

    if (pathname !== previousPath) {
      if (pathname !== '/') this.showRightView();
      this.setState({ previousPath: pathname });
    }
  }

  /* View controls */
  hideAllViews = () => {
    this.hideTopMenu();
    this.hideLeftMenu();
    this.hideRightView();
    this.hideBottomView();

    return true;
  };

  showTopMenu = () => this.hideAllViews() && this.setState({ showTopMenu: true });
  hideTopMenu = () => this.setState({ showTopMenu: false });
  toggleTopMenu = () => this.state.showTopMenu ? this.hideTopMenu() : this.showTopMenu();

  showLeftMenu = () => this.setState({ showLeftMenu: true });
  hideLeftMenu = () => this.setState({ showLeftMenu: false });
  toggleLeftMenu = () => this.state.showLeftMenu ? this.hideLeftMenu() : this.showLeftMenu();

  showRightView = () => this.hideAllViews() && this.setState({ showRightView: true });
  hideRightView = () => this.setState({ showRightView: false });
  toggleRightView = () => this.state.showRightView ? this.hideRightView() : this.showRightView();

  showBottomView = () => this.hideAllViews() && this.setState({ showBottomView: true });
  hideBottomView = () => this.setState({ showBottomView: false });
  toggleBottomView = () => this.state.showBottomView ? this.hideBottomView() : this.showBottomView();

  /* Headshop controls */
  setHeadshop = headshop => {
    const { history } = this.props;

    this.setState({
      models: { ...this.state.models, headshop },
    }, () => {
      history.push(`/headshop/${headshop.id}`);

      this.getPiecesByHeadshop();
    });
  }
  
  clearHeadshop = () => {
    const { history } = this.props;

    this.setState({
      models:{ ...this.state.models, headshop: null },
    }, () => history.push(`/headshops/`));
  }

  /* Artist controls */
  setArtist = artist => {
    const { history } = this.props;
    
    this.setState({
      models: { ...this.state.models, artist },
    }, () => {
      history.push(`/artist/${artist.id}`);

      this.getPiecesByArtist();
    });
  }
  clearArtist = () => {
    const { history } = this.props;

    this.setState({
      models: { ...this.state.models, artist: null },
    }, () => history.push('/artists/'));
  }
  

  /* Piece controls */
  setPiece = piece => {
    const { history } = this.props;
    
    this.setState({
      models: { ...this.state.models, piece },
    }, () => history.push(`/piece/${piece.id}`));
  }
  
  clearPiece = () => {
    const { history } = this.props;

    this.setState({
      models: { ...this.state.models, piece: null },
    }, () => history.push('/pieces/'));
  }

  /* XHR */
  getHeadshops = async () => {
    try {
      const headshops = await axios.get('http://localhost:6166/headshops');

      this.setState({
        data: {
          ...this.state.data,
          headshops: headshops.data,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  getArtists = async () => {
    try {
      const artists = await axios.get('http://localhost:6166/artists');

      this.setState({
        data: {
          ...this.state.data,
          artists: artists.data,
        },
      });
    } catch (e) {
      console.error(e);

      return [];
    }
  }

  getPieces = async () => {
    try {
      const pieces = await axios.get('http://localhost:6166/pieces');

      this.setState({
        data: {
          ...this.state.data,
          pieces: pieces.data,
        },
      });
    } catch (e) {
      console.error(e);

      return [];
    }
  }

  getPiecesByHeadshop = async () => {
    const {
      models: {
        headshop: {
          id,
        },
      },
    } = this.state;

    const { data: pieces } = await axios.get(`http://localhost:6166/pieces/headshop/${id}`);

    this.setState({
      models: {
        ...this.state.models,
        headshop: {
          ...this.state.models.headshop,
          pieces
        }
      }
    });
  }

  getPiecesByArtist = async () => {
    const {
      models: {
        artist: {
          id,
        },
      },
    } = this.state;

    const { data: pieces } = await axios.get(`http://localhost:6166/pieces/artist/${id}`);

    this.setState({
      models: {
        ...this.state.models,
        artist: {
          ...this.state.models.artist,
          pieces
        }
      }
    });
  }

  async initMap() {
    this.map = new window.google.maps.Map(
      document.getElementById('map'),
      {
        center: {
          lat: 33.071875,
          lng: -97.029784,
        },
        zoom: 14,
      }
    );

    try {
      const { data } = await axios.get('http://localhost:6166/headshops');

      const markers = data.map(tuple => new window.google.maps.Marker({
        id: tuple[1].id,
        title: tuple[1].name,
        position: tuple[1].position,
        headshop: tuple[1],
      }));

      markers.forEach(marker => {
        marker.addListener('click', () => {
          this.setHeadshop(marker.headshop);
          this.showRightView();
        });
        marker.setMap(this.map);
      });

      this.forceUpdate();
    } catch (e) {
      return;
    }
  }

  render() {
    const { history } = this.props;
    const {
      showTopMenu,
      showLeftMenu,
      showRightView,
      showBottomView,
      models: {
        headshop,
        artist,
        piece,
      },
      data: {
        headshops,
        artists,
        pieces,
      },
    } = this.state;

    return (
      <Wrapper>
        <TopBar
          hideAllViews={this.hideAllViews}
          getHeadshops={this.getHeadshops}
          getArtists={this.getArtists}
          getPieces={this.getPieces}
          toggleTopMenu={this.toggleTopMenu}
          toggleLeftMenu={this.toggleLeftMenu}
          toggleRightView={this.toggleRightView}
          toggleBottomView={this.toggleBottomView} />
        <Sidebar.Pushable>
          <Map />          
          <TopMenu visible={showTopMenu} />
          <LeftMenu visible={showLeftMenu} />
          <RightView
            visible={showRightView}
            history={history}

            headshops={headshops}
            artists={artists}
            pieces={pieces}

            headshop={headshop}
            artist={artist}
            piece={piece}
            
            setHeadshop={this.setHeadshop} 
            setArtist={this.setArtist} 
            setPiece={this.setPiece}
            
            getHeadshops={this.getHeadshops} 
            getArtists={this.getArtists} 
            getPieces={this.getPieces} />
          {/*<BottomView visible={showBottomView} />*/}
        </Sidebar.Pushable>
        <BottomBar
          showLeftMenu={showLeftMenu}          
          showRightView={showRightView}
          toggleLeftMenu={this.toggleLeftMenu}
          toggleRightView={this.toggleRightView} />
      </Wrapper>
    );
  }
}

export default withRouter(App);