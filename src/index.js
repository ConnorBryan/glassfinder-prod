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

          const { data } = await axios.get(path);
          
          dispatch(ACTIONS[setModels](data));
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

        try {
          const { data } = axios.get(`${CONSTANTS.API_ROOT}/${singular}/${id}`);

          dispatch(ACTIONS[setModel](data));
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
  INITIALIZE: 'INITIALIZE',
};

export const ACTIONS = {
  setError: error => ({ type: ACTION_TYPES.SET_ERROR, error }),
  setVersion: version => ({ type: ACTION_TYPES.SET_VERSION, version }),
  setLoading: isLoading => ({ type: ACTION_TYPES.SET_LOADING, isLoading }),
  setModel: model => ({ type: ACTION_TYPES.SET_MODEL, model }),
  setInitialized: () => ({ type: ACTION_TYPES.SET_INITIALIZED }),
  setPage: page => ({ type: ACTION_TYPES.SET_PAGE, page }),
  initialize: () => dispatch => {
    dispatch(ACTIONS.setVersion('1.0.1'));
    dispatch(ACTIONS.setInitialized());
  },
};

export const INITIAL_STATE = {
  version: '1.0.0',
  isLoading: false,
  model: null,
  page: 0,
  initialized: false,
};

export const HANDLERS = {
  [ACTION_TYPES.SET_VERSION]: (state, { version }) => ({ ...state, version }),
  [ACTION_TYPES.SET_LOADING]: (state, { isLoading }) => ({ ...state, isLoading }),
  [ACTION_TYPES.SET_MODEL]: (state, { model }) => ({ ...state, model }),
  [ACTION_TYPES.SET_PAGE]: (state, { page }) => ({ ...state, page }),
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
    onClick: () => props.actions[`get${S(plural).capitalize()}`](),
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
              {MODELS.map(({ singular, plural }, index) => [
                <Route
                  exact
                  key={`${singular}-master`}
                  path={`/${plural}`}
                  render={() => <Master type={singular} {...this.props} />} />,
                <Route
                  exact
                  key={`${singular}-detail`}
                  path={`/${singular}/:id`}
                  render={() => <Detail type={singular} {...this.props} />} />,
              ])} 
            </Switch>
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
