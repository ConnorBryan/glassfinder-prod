import {
  applyMiddleware,
  bindActionCreators,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'universal-cookie';

import CONSTANTS from '../constants';
import ACTION_HANDLERS from './actionHandlers';
import ACTIONS from './actions';

const COOKIES = new Cookies();

export const INITIAL_STATE = {
  initialized: false,

  hasPassedAgeGate: !!COOKIES.get(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE),

  isLoading: false,

  error: null,

  sidebarVisible: false,

  localShopsPage: 1,
  localPiecesPage: 1,

  shopsById: new Map(),
  activeShop: null,
  fetcingShops: false,

  artistsById: new Map(),
  activeArtist: null,

  piecesById: new Map(),
  activePiece: null,
  fetcingPieces: false,
};

export const REDUCER = (state = INITIAL_STATE, action) => (
  ACTION_HANDLERS[action.type]
    ? ACTION_HANDLERS[action.type](state, action)
    : state
);

export const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
export const configureStore = () => finalCreateStore(REDUCER, INITIAL_STATE);
export const mapStateToProps = state => ({ ...state });
export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(ACTIONS, dispatch) });

export default configureStore();

