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
  hasPassedAgeGate: !!COOKIES.get(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE),
  isLoading: false,
  initialized: false,
  mapmarkers: [],
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

