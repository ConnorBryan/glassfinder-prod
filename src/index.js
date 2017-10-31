/*
  G L A S S F I N D E R
    by Connor Bryan
*/

/*
  U t i l i t y
    I m p o r t s
*/
import axios from 'axios';
import S from 'string';

/*
  S t y l e
    I m p o r t s
*/
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Search,
  Segment,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

/*
  R e a c t
    I m p o r t s
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

/*
  R e d u x
    I m p o r t s
*/
import {
  applyMiddleware,
  bindActionCreators,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import {
  connect,
  Provider,
} from 'react-redux';

/*
  C o n s t a n t s
*/
export const CONSTANTS = {
  API_ROOT: 'http://localhost:6166',
  ASSOCIATIONS: {
    headshop: ['artist', 'company', 'piece'],
    artist: ['headshop', 'company', 'piece'],
    company: ['headshop', 'artist', 'piece'],
    piece: ['headshop', 'artist', 'company'],
  },
};

/*
  M o d e l s
*/
const MODELS = [
  {
    singular: 'headshop',
    plural: 'headshops',
  },
  {
    singular: 'artist',
    plural: 'artists',
  },
  {
    singular: 'company',
    plural: 'companies',
  },
  {
    singular: 'piece',
    plural: 'pieces',
  },
];

/**
 * @function generateReduxConfigFromModels
 * @desc Abstracts over the Redux boilerplate process for common themes across models.
 * @param {Array<object>} MODELS 
 * @param {object} ACTION_TYPES 
 * @param {object} ACTIONS 
 * @param {object} INITIAL_STATE 
 * @param {object} HANDLERS 
 */
export function generateReduxConfigFromModels(MODELS, ACTION_TYPES, ACTIONS, INITIAL_STATE, HANDLERS) {
    MODELS.forEach(model => {
      const { singular, plural } = model;

      const capitalizedSingular = S(singular).capitalize();
      const capitalizedPlural = S(plural).capitalize();
      const uppercasePlural = capitalizedPlural.toUpperCase();

      const SET_MODELS = `SET_${uppercasePlural}`;
      const SET_MODEL = 'SET_MODEL';
      const getModels = `get${capitalizedPlural}`;
      const setModels = `set${capitalizedPlural}`;
      const getModel = `get${capitalizedSingular}`;
      const setModel = `set${capitalizedSingular}`;
      
      INITIAL_STATE[plural] = [];
      ACTION_TYPES[SET_MODELS] = SET_MODELS;
      ACTIONS[setModels] = data => ({ type: ACTION_TYPES[SET_MODELS], [plural]: data });
      ACTIONS[setModel] = data => ({ type: ACTION_TYPES[SET_MODEL], model: data });
      ACTIONS[getModels] = (sort, reversed) => async (dispatch, getState) => {
        dispatch(ACTIONS.setLoading(true));

        const { page } = getState();

        try {
          let path = `${CONSTANTS.API_ROOT}/${plural}?`;

          path += `page=${page}&`;

          if (sort) path += `sort=${sort}&`;
          if (reversed) path += `reversed=${reversed}`;

          const { data: { collection, collectionSize } } = await axios.get(path);
          
          dispatch(ACTIONS[setModels](collection));
          dispatch(ACTIONS.setModelType(plural));
          dispatch(ACTIONS.setCollectionSize(collectionSize));
        } catch (e) {
          dispatch(ACTIONS.setError({
            error: e,
            message: `Unable to fetch ${plural}`,
          }));
        } finally {
          dispatch(ACTIONS.setLoading(false));
        }
      };
      ACTIONS[getModel] = id => async (dispatch, getState) => {
        dispatch(ACTIONS.setLoading(true));

        await new Promise(r => setTimeout(r, 1000));

        try {
          const { data } = await axios.get(`${CONSTANTS.API_ROOT}/${singular}/${id}`);

          dispatch(ACTIONS[setModel](data));
          dispatch(ACTIONS.setModelType(singular));
        } catch (e) {
          dispatch(ACTIONS.setError({
            error: e,
            message: `Unable to fetch ${singular} with ID ${id}`,
          }));          
        } finally {
          dispatch(ACTIONS.setLoading(false));        
        }
      };
      HANDLERS[SET_MODELS] = (state, { [plural]: data }) => ({ ...state, [plural]: data });      
    });
}

export const getModelSingular = plural => (
  MODELS.filter(model => model.plural === plural).map(model => model.singular)[0] || null
)
export const getModelPlural = singular => (
  MODELS.filter(model => model.singular === singular).map(model => model.plural)[0] || null
)
export const getModelGetter = model => `get${S(model).capitalize()}`
/*
  R e d u x
*/
export const ACTION_TYPES = {
  SET_ERROR: 'SET_ERROR',
  SET_VERSION: 'SET_VERSION',
  SET_LOADING: 'SET_LOADING',
  SET_INITIALIZED: 'SET_INITIALIZED',
  SET_MODEL: 'SET_MODEL',
  SET_PAGE: 'SET_PAGE',
  SET_MODEL_TYPE: 'SET_MODEL_TYPE',
  SET_COLLECTION_SIZE: 'SET_COLLECTION_SIZE',
  SET_MAPMARKERS: 'SET_MAPMARKERS',
  INITIALIZE: 'INITIALIZE',
};

export const ACTIONS = {
  setError: error => ({ type: ACTION_TYPES.SET_ERROR, error }),
  setVersion: version => ({ type: ACTION_TYPES.SET_VERSION, version }),
  setLoading: isLoading => ({ type: ACTION_TYPES.SET_LOADING, isLoading }),
  setModel: model => ({ type: ACTION_TYPES.SET_MODEL, model }),
  setInitialized: () => ({ type: ACTION_TYPES.SET_INITIALIZED }),
  setPage: page => ({ type: ACTION_TYPES.SET_PAGE, page }),
  setModelType: modelType => ({ type: ACTION_TYPES.SET_MODEL_TYPE, modelType }),
  setCollectionSize: collectionSize => ({ type: ACTION_TYPES.SET_COLLECTION_SIZE, collectionSize }),
  setMapmarkers: mapmarkers => ({ type: ACTION_TYPES.SET_MAPMARKERS, mapmarkers }),
  initialize: () => dispatch => {
    dispatch(ACTIONS.setVersion('1.0.1'));
    dispatch(ACTIONS.setInitialized());
  },
  loadPage: page => (dispatch, getState) => {
    const { modelType, collectionSize: lastPage } = getState();
    const modelGetter = getModelGetter(modelType);

    if ((page < 0) || (page >= lastPage)) return false;
    
    try {
      dispatch(ACTIONS.setLoading(true));
      dispatch(ACTIONS.setPage(page));
      dispatch(ACTIONS[modelGetter]());
    } catch (e) {
      dispatch(ACTIONS.setError({
        error: e,
        message: `Unable to load page ${page} of ${modelType}`,
      }));
    } finally {
      dispatch(ACTIONS.setLoading(false));
    }
  },
  getMapmarkers: () => async dispatch => {
    try {
      const { data } = await axios.get(`${CONSTANTS.API_ROOT}/mapmarkers`);

      dispatch(ACTIONS.setMapmarkers(data));
    } catch (e) {
      dispatch(ACTIONS.setError({
        error: e,
        message: `Unable to retrieve mapmarkers`,
      }));
    }
  },
};

export const INITIAL_STATE = {
  version: '1.0.0',
  isLoading: false,
  model: {},
  page: 0,
  initialized: false,
  modelType: null,
  mapmarkers: [],
};

export const HANDLERS = {
  [ACTION_TYPES.SET_VERSION]: (state, { version }) => ({ ...state, version }),
  [ACTION_TYPES.SET_LOADING]: (state, { isLoading }) => ({ ...state, isLoading }),
  [ACTION_TYPES.SET_MODEL]: (state, { model }) => ({ ...state, model }),
  [ACTION_TYPES.SET_PAGE]: (state, { page }) => ({ ...state, page }),
  [ACTION_TYPES.SET_MODEL_TYPE]: (state, { modelType }) => ({ ...state, modelType }),
  [ACTION_TYPES.SET_COLLECTION_SIZE]: (state, { collectionSize }) => ({ ...state, collectionSize }),
  [ACTION_TYPES.SET_MAPMARKERS]: (state, { mapmarkers }) => ({ ...state, mapmarkers }),
  [ACTION_TYPES.SET_INITIALIZED]: state => ({ ...state, initialized: true }),
};

generateReduxConfigFromModels(MODELS, ACTION_TYPES, ACTIONS, INITIAL_STATE, HANDLERS);

export const REDUCER = (state = INITIAL_STATE, action) => (
  HANDLERS[action.type]
    ? HANDLERS[action.type](state, action)
    : state
);

export const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
export const configureStore = () => finalCreateStore(REDUCER, INITIAL_STATE);
export const mapStateToProps = state => ({ ...state });
export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(ACTIONS, dispatch) });

export const STORE = configureStore();

/*
  R e a c t
*/
/**
 * @function DeveloperTools
 * @desc Useful for debugging purposes.
 * @param {object} props 
 * @returns {Component}
 */
export function DeveloperTools(props) {
  const modelItems = MODELS.map(({ singular, plural }, index) => ({
    key: index,
    content: `Get ${S(plural).capitalize()}`,
    as: Link,
    to: `/${plural}`,
    onClick: e => {
      props.actions[getModelGetter(plural)]();
      props.actions.setModelType(plural);
    },
  }));

  const items = [
    {
      key: 'header',
      header: true,
      content: 'Developer Tools',
      as: Link,
      to: '/',
    },
    ...modelItems,
  ];

  return (
    <Menu
      inverted
      items={items} />
  );
}

/**
 * @function Home
 * @desc The default view for the application.
 * @param {object} props 
 * @returns {Component}
 */
export class Home extends Component {
  componentDidMount() {
    window.google
      ? this.initMap()
      : (window.initMap = () => this.initMap());
  }

  componentWillReceiveProps(nextProps) {
    const { mapmarkers } = nextProps;

    if (mapmarkers.length > 0) {
      this.renderMapmarkers();
    }
  }

  async initMap() {
    const {
      headshops,
      actions: {
        getMapmarkers,
      },
    } = this.props;

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

    getMapmarkers();
  }

  renderMapmarkers() {
    setTimeout(() => {

      const {
      history: { history },
      mapmarkers,
    } = this.props;

    const addedMarkers = mapmarkers.map(headshop => new window.google.maps.Marker({
      id: headshop.id,
      title: headshop.name,
      position: headshop.position,
    }));

    addedMarkers.forEach(mapmarker => {
      const { id } = mapmarker;

      mapmarker.addListener('click', () => history.push(`/headshop/${id}`));
      mapmarker.setMap(this.map);
    });

    }, 1000);
  }

  render() {
    return (
      <Segment
        raised
        id='map' />
    );
  }
}

/**
 * @function Master
 * @desc A list-style view for browsing through models.
 * @param {object} props 
 * @returns {Component}
 */
export class Master extends Component {
  render() {
    const {
      page,
      collectionSize: lastPage,
      type,
      actions: {
        loadPage,
      },
    } = this.props;
    const { [type]: collection } = this.props;

    const Pagination = () => !collection.length ? null : (
      <Segment
          attached='top'>
          <Button.Group
            compact
            widths={5}>
              <Button
                primary
                disabled={page === 0}
                icon='fast backward'
                onClick={() => loadPage(0)} />
              <Button
                primary
                disabled={page === 0}
                icon='chevron left'
                onClick={() => loadPage(page - 1)} />
              <Button content={`${page + 1}`} />
              <Button
                primary
                disabled={page + 1 >= lastPage}
                icon='chevron right'
                onClick={() => loadPage(page + 1)} />
              <Button
                primary
                disabled={page + 1 >= lastPage}
                icon='fast forward'
                onClick={() => loadPage(lastPage - 1)} />
          </Button.Group>
        </Segment>
    );

    if (!collection) return null;

    return (
      <Segment>
        <Segment attached='top'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h3'>
                  {S(type).capitalize().s}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Dropdown text='Sort'>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon='star'
                      text='Rating' />
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment attached='top'>
          <Search />
        </Segment>
        <Pagination />
        <Segment attached='top'>
          <Item.Group>
            {collection.map((item, key) => (
              <Item
                as={Link}
                key={key}
                to={`/${getModelSingular(type)}/${item.id}`}>
                <Item.Content>
                  {item.name}
                </Item.Content>
                <Item.Content>
                  <Icon name='announcement' /> {item.tagline}
                </Item.Content>
                <Item.Content>
                  <Icon name='star' /> Rating {item.rating} / 5.00
                </Item.Content>
              </Item>
            ))}
            {!collection.length && (
              <Item.Content>
                <Icon name='warning sign' /> <br/>
                No {type} found. <br />
                Please try again later.
              </Item.Content>
            )}
          </Item.Group>
        </Segment>
        <Pagination />
      </Segment>
    );
  }
}

/**
 * @function Detail
 * @desc A view presenting more information about a model.
 * @param {object} props 
 * @returns {Component}
 */
export class Detail extends Component {
  static defaultProps = {
    model: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sliders: [],
    };
  }

  componentDidMount() {
    const {
      type,
      location: { pathname },
      actions: { setModel },
    } = this.props;
    const { [getModelPlural(type)]: collection } = this.props;

    // Grab the local model.
    const id = pathname.split('/').pop();
    const model = collection.filter(model => model.id === id)[0] || {};    
    
    setModel(model);

    this.loadSliders(type, model);
  }

  /**
   * @method loadSliders
   * @desc Using the associated collections of IDs to other models,
   *       create slider configuration objects.
   * @param {*} type 
   * @param {*} model 
   */
  loadSliders(type, model) {
    const { actions: { setError } } = this.props;

    const sliders = [];
    
    CONSTANTS.ASSOCIATIONS[type].forEach(async association => {
      const plural = getModelPlural(association);
      const collection = model[plural] || [];
      const collectionById = collection.reduce((queryParam, id, i) => queryParam + `${i > 0 ? ',' : ''}${id}`, '');
      
      try {
        const { data } = await axios.get(`${CONSTANTS.API_ROOT}/${plural}ById?collection=${collectionById}`);

        sliders.push({
          type: association,
          collection: data,
        });

        this.setState({ sliders });
      } catch (e) {
        setError({
          error: e,
          message: `Failed while trying to retrieve sliders for ${type}`,
        });
      }
    });
  }

  render() {
    const {
      history,
      model: {
        address,
        description,
        email,
        id,
        image,
        images,
        memberSince,
        name,
        phone,
        position,
        rating,
        tagline,
      },
    } = this.props;
    let { type } = this.props;    
    const { sliders } = this.state;

    type = S(type).capitalize().s;

    return [
      <Segment key='main'>
        <Label
          ribbon
          color='blue'
          positon='top left'>
          <Header as='h3'>
            {type}
          </Header>
        </Label>
        <Label position='right'>
            Member since {memberSince}
          </Label>
        <Segment secondary>
          <Item>
            <Item.Image
              size='small'
              src={image} />
            <Item.Header as='h2'>
              {name}
            </Item.Header>
            <Item.Content>
              <Item.Meta>
                <Icon name='announcement' /> {tagline}
              </Item.Meta>
            </Item.Content>
          </Item>
        </Segment>
        <Menu
          borderless
          as={Segment}>
          <Menu.Item>
            <Icon name='star' /> Rating {rating} / 5.00
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item icon='chevron up' />
            <Menu.Item icon='chevron down' />
          </Menu.Menu>
        </Menu>
        <Segment>
          <Label position='left'>
            <Icon name='phone' /> {phone}
          </Label>
          <Label position='right'>
            <Icon name='envelope' /> {email}
          </Label>
        </Segment>
        <Segment>
          <Header as='h3'>
            About
          </Header>
          {description}
        </Segment>
      </Segment>,
      <Segment key='sliders'>
        {sliders.map(({ type, collection }) => (
          <Slider
            key={type}
            history={history}
            type={type}
            collection={collection} />
        ))}
      </Segment>
    ];
  }
}

export function Slider(props) {
  const {
    history,
    type,
    collection,
    images,
  } = props;

  const plural = getModelPlural(type);

  return (
    <Segment>
      <Menu attached='top'>
        <Menu.Item header>
          {S(plural).capitalize().s}
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            Sort
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Segment
        className='Slider-images'
        attached='bottom'>
        {collection.map(({ id, image }, index) => (
          <Image
            className='Slider-image'
            key={index}
            src={image}
            onClick={() => history.push(`/${type}/${id}`)} />
        ))}
      </Segment>
    </Segment>
  );
}

Slider.propTypes = {
  type: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};

Slider.defaultProps = {
  type: '',
  images: [],
};

/**
 * @class BaseApp
 * @desc This is the primary application delivered to the end user.
 */
export class BaseApp extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  };

  static defaultProps = {
    actions: {},
  };

  /**
   * L I F E C Y C L E
   *    M E T H O D S
   */
  componentDidMount() {
    const { actions: { initialize } } = this.props;
    
    initialize();
  }

  render() {
    const { isLoading } = this.props;

    return (
      <Container fluid>
        <Router>
          <div>
            <DeveloperTools {...this.props} />
            {isLoading
              ? null
              : (
                <Switch>
                  <Route
                    exact
                    path='/'
                    render={history => <Home history={history} {...this.props} />} />
                  {MODELS.map(({ singular, plural }, index) => [
                    <Route
                      exact
                      key={`${singular}-master`}
                      path={`/${plural}`}
                      render={() => (
                        <Master
                          type={plural}
                          {...this.props} />
                      )} />,
                    <Route
                      exact
                      key={`${singular}-detail`}
                      path={`/${singular}/:id`}
                      render={router => (
                        <Detail
                          type={singular}
                          {...this.props}
                          {...router} />
                      )} />,
                  ])} 
                </Switch>
              )
            }
          </div>
        </Router>
      </Container>
    );
  }
}

/**
 * @const App
 * @desc This is the raring-to-go application in all its glory.
 */
export const App = connect(mapStateToProps, mapDispatchToProps)(BaseApp);

/**
 * @class Root
 * @desc The Root acts as the provider for Redux data.
 */
export class Root extends Component {
  render () {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

/**
 * @function Everything
 * @desc Yup, all of it.
 */
export const Everything = () => (
  <Root store={STORE}>
    <Router>
      <App />
    </Router>
  </Root>
);

ReactDOM.render(<Everything />, document.getElementById('root'));
