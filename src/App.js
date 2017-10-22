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
      as: Link,
      to: '/',
      header: true,
      content: 'Glassfinder',
      onClick: props.hideAllViews
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
  const {
    accessor,
    title,
    setPiece,
  } = props;
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
    pieces,
  } = model;

  const sliderPieces = pieces
    ? pieces.map((piece, index) => ({
      id: piece.id,
      src: piece.image,
      onClick: id => setPiece(piece),
    }))
    : [];

  return (
    <Segment
      inverted
      className='transparent'
      attached='top'>
      <Label ribbon>
        <Header as='h2'>
          {title}
        </Header>
      </Label>
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
            <Item.Extra>
              <Label>
                View all images
              </Label>
              <Label>
                Show on map
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
        {accessor !== 'piece' && (
          <Item>
            <Item.Header as='h4'>
              Pieces
            </Item.Header>
            <Item.Content>
              {sliderPieces.length > 0 && (
                <Slider
                  images={sliderPieces} />
              )}
            </Item.Content>
          </Item>
        )}
        <Item>
          <Item.Content>
            Images
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

function Slider(props) {
  const { images } = props;

  return (
    <Image.Group
      className='Slider'
      size='small'>
      {images.map((image, index) => (
        <Image
          key={index}
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
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    window.google
      ? this.initMap()
      : (window.initMap = () => this.initMap());
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

  showLeftMenu = () => this.hideAllViews() && this.setState({ showLeftMenu: true });
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
    }, () => history.push(`/headshop/${headshop.id}`));
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
            setPiece={this.setPiece} />
          <BottomView visible={showBottomView} />
        </Sidebar.Pushable>
        <BottomBar />
      </Wrapper>
    );
  }
}

export default withRouter(App);