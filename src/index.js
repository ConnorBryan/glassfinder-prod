/*
  G L A S S F I N D E R
    by Connor Bryan
*/

/*
  U t i l i t y
    I m p o r t s
*/
import axios from 'axios';

/*
  S t y l e
    I m p o r t s
*/
import {
  Container,
  Menu,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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
};

/*
  R e d u x
*/
export const ACTION_TYPES = {
  SET_ERROR: 'SET_ERROR',
  SET_VERSION: 'SET_VERSION',
  SET_LOADING: 'SET_LOADING',
  SET_INITIALIZED: 'SET_INITIALIZED',
  INITIALIZE: 'INITIALIZE',
};

export const ACTIONS = {
  setError: error => ({ type: ACTION_TYPES.SET_ERROR, error }),
  setVersion: version => ({ type: ACTION_TYPES.SET_VERSION, version }),
  setLoading: isLoading => ({ type: ACTION_TYPES.SET_LOADING, isLoading }),
  setInitialized: () => ({ type: ACTION_TYPES.SET_INITIALIZED }),
  initialize: () => dispatch => {
    dispatch(ACTIONS.setVersion('1.0.1'));
    dispatch(ACTIONS.setInitialized());
  },
};

export const INITIAL_STATE = {
  version: '1.0.0',
  isLoading: false,
  initialized: false,
};

export const HANDLERS = {
  [ACTION_TYPES.SET_VERSION]: (state, { version }) => ({ ...state, version }),
  [ACTION_TYPES.SET_LOADING]: (state, { isLoading }) => ({ ...state, isLoading }),
  [ACTION_TYPES.SET_INITIALIZED]: state => ({ ...state, initialized: true }),
};

export const MODELS = [
  {
    type: 'headshopsById',
    title: 'Headshops',
    url: '/headshops',
    getterType: 'GET_HEADSHOPS_BY_ID',
    getter: 'getHeadshopsById',
    setterType: 'SET_HEADSHOPS_BY_ID',
    setter: 'setHeadshopsById',
  },
  {
    type: 'artistsById',
    title: 'Artists',
    url: '/artists',
    getterType: 'GET_ARTISTS_BY_ID',
    getter: 'getArtistsById',
    setterType: 'SET_ARTISTS_BY_ID',
    setter: 'setArtistsById',
  },
  {
    type: 'companiesById',
    title: 'Companies',
    url: '/companies',
    getterType: 'GET_COMPANIES_BY_ID',
    getter: 'getCompaniesById',
    setterType: 'SET_COMPANIES_BY_ID',
    setter: 'setCompaniesById',
  },
  {
    type: 'piecesById',
    title: 'Pieces',
    url: '/pieces',
    getterType: 'GET_PIECES_BY_ID',
    getter: 'getPiecesById',
    setterType: 'GET_PIECES_BY_ID',
    setter: 'setPiecesById',
  },
];

export const modelGetter = modelConfig => () => async (dispatch, getState) => {
  const {
    url,
    setter,
    type,
  } = modelConfig;

  const { [type]: oldData } = getState();

  if (oldData) return;

  try {
    const path = `${CONSTANTS.API_ROOT}${url}`;
    const { data } = await axios.get(path);

    dispatch(ACTIONS.setLoading(true));
    dispatch(ACTIONS[setter](data));
  } catch (e) {
    dispatch(ACTIONS.setError({
      error: e,
      message: `Unable to fetch ${type}`,
    }));
  } finally {
    dispatch(ACTIONS.setLoading(false));    
  }
}
export const modelSetter = config => (state, { [config.type]: data }) => ({ ...state, [config.type]: new Map(data) });
export const generateModel = modelConfig => {
  const {
    type,
    setterType,
    getter,
    setter,
  } = modelConfig;

  INITIAL_STATE[type] = null;
  ACTION_TYPES[setterType] = setterType;
  ACTIONS[getter] = modelGetter(modelConfig),
  ACTIONS[setter] = data => ({ type: ACTION_TYPES[setterType], [type]: data }) ,
  HANDLERS[[ACTION_TYPES[setterType]]] = modelSetter(modelConfig);
}

MODELS.forEach(modelConfig => generateModel(modelConfig));

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
  const modelItems = MODELS.map(({ title, url, getter }, index) => ({
    key: index,
    content: `Get ${title}`,
    as: Link,
    to: url,
    onClick: props.actions[getter],
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
export function Home(props) {
  return (
    <div>
      Home
    </div>
  );
}

/**
 * @function Master
 * @desc A list-style view for browsing through models.
 * @param {object} props 
 * @returns {Component}
 */
export function Master(props) {
  const {
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
    type,
  } = props;
  
  return (
    <div>
      Master
      {type}
    </div>
  );
}

/**
 * @function Detail
 * @desc A view presenting more information about a model.
 * @param {object} props 
 * @returns {Component}
 */
export function Detail(props) {
  const {
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
    type,
  } = props;

  /**
   * @function Bar
   * @desc A view that contains various sections to be displayed horizontally.
   * @param {object} props
   * @returns {Component}
   */
  function Bar(props) {
    return (
      <div>
        Bar
      </div>
    );
  }

  /**
   * @function Nametag
   * @desc A view presenting the type, image and name of a model.
   * @param {object} props 
   * @returns {Component}
   */
  function Nametag(props) {
    return (
      <div>
        Nametag
      </div>
    );
  }

  /**
   * @function InfoBar
   * @desc A view presenting the address and memberSince of a model.
   * @param {object} props 
   * @returns {Component}
   */
  function InfoBar(props) {
    return (
      <Bar />
    );
  }

  /**
   * @function RatingBar
   * @desc A view presenting the rating of a model,
   *       as well as ways of interacting with the rating.
   * @param {object} props 
   * @returns {Component}
   */
  function RatingBar(props) {
    return (
      <Bar />
    );
  }

  /**
   * @function ContactBar
   * @desc A view presenting the phone number and email of a model.
   * @param {object} props 
   * @returns {Component}
   */
  function ContactBar(props) {
    return (
      <Bar />
    );
  }

  /**
   * @function DescriptionBox
   * @desc A view presenting the description of a model.
   * @param {object} props 
   * @returns {Component}
   */
  function DescriptionBox(props) {
    return (
      <div>
        DescriptionBox
      </div>
    );
  }

  /**
   * @function Slider
   * @desc A view acting as a collection for a series of images.
   * @param {object} props 
   * @returns {Component}
   */
  function Slider(props) {
    return (
      <div>
        Slider
      </div>
    );
  }

  return (
    <div className='Detail'>
      <Nametag
        type={type}
        image={image}
        name={name} />

      <InfoBar
        address={address}
        memberSince={memberSince} />
      
      <RatingBar
        id={id}
        rating={rating} />

      <ContactBar
        phone={phone}
        email={email} />

      <DescriptionBox description={description} />

      <Slider images={images} />
    </div>
  );
}

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
    console.log('App rendering with', this.props)
    return (
      <Container fluid>
        <Router>
          <div>
            <DeveloperTools {...this.props} />
            <Switch>
              <Route
                exact
                path='/'
                render={() => <Home {...this.props} />} />
              {MODELS.map(({ type, url }, index) => [
                <Route
                  exact
                  key={`${type}-master`}
                  path={url}
                  render={() => <Master type={type} {...this.props} />} />,
                <Route
                  exact
                  key={`${type}-detail`}
                  path={`${url}/:id`}
                  render={() => <Detail type={type} {...this.props} />} />,
              ])} 
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}

const getPropTypesFromModels = (previousPropTypes = {}) => {
  MODELS.reduce((propTypes, { type }) => {
    propTypes[type] = PropTypes.object;

    return propTypes;
  }, { ...previousPropTypes })
};

const getDefaultPropsFromModels = (previousDefaultProps = {}) => {
  MODELS.reduce((defaultProps, { type }) => {
    defaultProps[type] = new Map();
    
    return defaultProps;
  }, { ...previousDefaultProps })
};

BaseApp.propTypes = getPropTypesFromModels();
BaseApp.defaultProps = getDefaultPropsFromModels();

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
