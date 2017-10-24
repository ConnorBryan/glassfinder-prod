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
  R e a c t
    I m p o r t s
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
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

/* R e d u x */
export const SET_ERROR = 'SET_ERROR';
export const SET_VERSION = 'SET_VERSION';
export const SET_LOADING = 'SET_LOADING';
export const INITIALIZE = 'INITIALIZE';

export const GET_HEADSHOPS_BY_ID = 'GET_HEADSHOPS_BY_ID';
export const SET_HEADSHOPS_BY_ID = 'SET_HEADSHOPS_BY_ID';

export const ACTIONS = {
  setError: error => ({ type: SET_ERROR, error }),
  setVersion: version => ({ type: SET_VERSION, version }),
  setLoading: isLoading => ({ type: SET_LOADING, isLoading }),
  initialize: () => dispatch => {
    dispatch(ACTIONS.setVersion('1.0.1'));
    dispatch(ACTIONS.setLoading(true));
    dispatch(ACTIONS.getHeadshopsById());
  },
  
  getHeadshopsById: () => async dispatch => {
    try {
      const headshopsUrl = `${CONSTANTS.API_ROOT}/headshops`;
      const { data: headshops } = await axios.get(headshopsUrl);

      dispatch(ACTIONS.setHeadshopsById(headshops));
    } catch (e) {
      dispatch(ACTIONS.setError({
        error: e,
        message: 'Unable to fetch headshops',
      }));
    }
  },
  setHeadshopsById: headshopsById => ({ type: SET_HEADSHOPS_BY_ID, headshopsById }),
};

export const INITIAL_STATE = {
  version: '1.0.0',
  isLoading: false,
  initialized: false,

  headshopsById: [],
  artistsById: [],
  piecesById: [],
};

export const HANDLERS = {
  [SET_VERSION]: (state, { version }) => ({ ...state, version }),
  [SET_LOADING]: (state, { isLoading }) => ({ ...state, isLoading }),
  [SET_HEADSHOPS_BY_ID]: (state, { headshopsById }) => ({ ...state, headshopsById }),
};

export const REDUCER = (state = INITIAL_STATE, action) => (
  HANDLERS[action.type]
    ? HANDLERS[action.type](state, action)
    : state
);

export const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
export const configureStore = () => finalCreateStore(REDUCER, INITIAL_STATE);
export const mapStateToProps = state => ({ ...state });
export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(ACTIONS, dispatch) });

const STORE = configureStore();

/* R e a c t */
export class BaseApp extends Component {
  static propTypes = {

  };

  static defaultProps = {

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
    const {
      headshopsById,
      actions: {
        setLoading,
        setVersion,
      },
    } = this.props;

    return (
      <div>
        <button onClick={() => setLoading(false)} />
      </div>
    );
  }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(BaseApp);

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

export const Everything = () => (
  <Root store={STORE}>
    <Router>
      <App />
    </Router>
  </Root>
);

ReactDOM.render(<Everything />, document.getElementById('root'));
