import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import axios from 'axios';

import './App.css';

import {
  Button,
  Container,
  Dropdown,
  Header,
  Icon,
  Item,
  Label,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

function Bar(props) {
  const {
    attached,
    items
  } = props;

  return (
    <Menu
      attached={attached}
      items={items}
      inverted
      {...props} />
  );
}

function TopBar(props) {
  const items = [
    {
      key: 0,
      header: true,
      content: 'Glassfinder'
    },
    {
      key: 1,
      as: Link,
      to: '/headshops',
      onClick: props.getHeadshops,
      content: 'Get headshops'
    },
    {
      key: 2,
      as: Link,
      to: '/artists',
      onClick: props.getArtists,
      content: 'Get artists'
    },
    {
      key: 3,
      as: Link,
      to: '/pieces',
      onClick: props.getPieces,
      content: 'Get pieces'
    },
    {
      key: 4,
      onClick: props.toggleTopMenu,
      content: 'top'
    },
    {
      key: 5,
      onClick: props.toggleLeftMenu,
      content: 'left'
    },
    {
      key: 6,
      onClick: props.toggleRightView,
      content: 'right'
    },
    {
      key: 7,
      onClick: props.toggleBottomView,
      content: 'bottom'
    },
  ];

  return (
    <Bar
      className='Bar'
      attached='top'
      items={items} />
  );
}

function BottomBar(props) {
  const items = [
    {
      key: 0,
      header: true,
      content: 'Glassfinder'
    },
  ];

  return (
    <Bar
      className='Bar'
      attached='bottom'
      items={items} />
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
    <Router>
      <Container
        className='wrapper'
        fluid>
        {props.children}
      </Container>
    </Router>
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
  const { visible } = props;

  return (
    <View
      as={Menu}
      direction='left'
      visible={visible}>
      <Menu.Item>
        LeftMenu
      </Menu.Item>
    </View>
  );
}

function Master(props) {
  const {
    collection,
    path,
    title,
    onClick,
  } = props;

  const _collection = props[collection];

  if (!_collection) return null;

  const normalized = _collection.map(tuple => tuple[1]);

  const items = normalized.map((item, index) => ({
    key: index,
    as: Link,
    to: `/${path}/${item.id}`,
    content: item.name,
    onClick: () => onClick(item),
  }));

  return (
    <Menu
      inverted
      fluid
      vertical
      className='transparent'
      items={[
        {
          key: -1,
          header: true,
          as: 'h2',
          content: title,
        },
        ...items
      ]}>

    </Menu>
  );
}

function HeadshopsList(props) {
  const { setHeadshop } = props;

  return (
    <Master
      collection='headshops'
      path='headshop'
      title='Headshops'
      onClick={setHeadshop}
      {...props} />
  );
}

function ArtistsList(props) {
  const { setArtist } = props;

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
  const { setPiece } = props;

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
  const { accessor } = props;
  const model = props[accessor];

  const {
    image,
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
  } = model;

  return (
    <Segment
      inverted
      className='transparent'
      attached='top'>
      <Item.Group divided>
        <Item>
          <Item.Image
            shape='circular'
            src={image}
            size='small' />
          <Item.Content>
            <Item.Header>
              {name}
            </Item.Header>
            <Item.Extra>
              {city}, {state}
            </Item.Extra>
            <Item.Description>
              {tagline}
            </Item.Description>
            <Item.Extra>
              {memberSince && (
                <Label>
                  Member since {memberSince}
                </Label>
              )}
              {price && (
                <Label color='green'>
                  {price}
                </Label>
              )}
              <Label color='blue'>
                Rating {rating}
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
                Owned by {owner}
              </Menu.Item>
            )}
            <Menu.Item>
              {phone}
            </Menu.Item>
            <Menu.Item>
              {email}
            </Menu.Item>
          </Menu>
        </Item>
        <Item>
          <Item.Content>
            {description}
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            Pieces
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
}

function Headshop(props) {
  if (!props.headshop) return null;

  return (
    <Detail
      accessor='headshop'
      {...props} />
  );
}

function Artist(props) {
  if (!props.artist) return null;

  return (
    <Detail
      accessor='artist'
      {...props} />
  );
}

function Piece(props) {
  if (!props.piece) return null;

  return (
    <Detail
      accessor='piece'
      {...props} />
  );
}

function RightView(props) {
  const { visible } = props;

  return (
    <View
      as={Segment}
      className='fifty-percent-width no-padding'
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
          render={() => <HeadshopsList {...props} />} />
        <Route
          exact
          path='/artists'
          render={() => <ArtistsList {...props} />} />
        <Route
          exact
          path='/pieces'
          render={() => <PiecesList {...props} />} />
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
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    window.google
      ? this.initMap()
      : (window.initMap = () => this.initMap());
  }

  /* View controls */
  showTopMenu = () => this.setState({ showTopMenu: true });
  hideTopMenu = () => this.setState({ showTopMenu: false });
  toggleTopMenu = () => this.setState(prevState => ({ showTopMenu: !prevState.showTopMenu }));

  showLeftMenu = () => this.setState({ showLeftMenu: true });
  hideLeftMenu = () => this.setState({ showLeftMenu: false });
  toggleLeftMenu = () => this.setState(prevState => ({ showLeftMenu: !prevState.showLeftMenu }));

  showRightView = () => this.setState({ showRightView: true });
  hideRightView = () => this.setState({ showRightView: false });
  toggleRightView = () => this.setState(prevState => ({ showRightView: !prevState.showRightView }));

  showBottomView = () => this.setState({ showBottomView: true });
  hideBottomView = () => this.setState({ showBottomView: false });
  toggleBottomView = () => this.setState(prevState => ({ showBottomView: !prevState.showBottomView }));

  /* Headshop controls */
  setHeadshop = headshop => this.setState({
    models: { ...this.state.models, headshop },
  });
  clearHeadshop = () => this.setState({
    models:{ ...this.state.models, headshop: null },
  });

  /* Artist controls */
  setArtist = artist => this.setState({
    models: { ...this.state.models, artist },
  });
  clearArtist = () => this.setState({
    models: { ...this.state.models, artist: null },
  });

  /* Piece controls */
  setPiece = piece => this.setState({
    models: { ...this.state.models, piece },
  });
  clearPiece = () => this.setState({
    models: { ...this.state.models, piece: null },
  });

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

            headshops={headshops}
            artists={artists}
            pieces={pieces}

            headshop={headshop}
            artist={artist}
            piece={piece}
            
            setHeadshop={this.setHeadshop} 
            setArtist={this.setArtist} 
            setPiece={this.setPiece} />
          <BottomView visible={showBottomView} />
        </Sidebar.Pushable>
        <BottomBar />
      </Wrapper>
    );
  }
}

export default App;