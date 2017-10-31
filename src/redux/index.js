import {
  applyMiddleware,
  bindActionCreators,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';

import MODELS from '../models';
import generateReduxConfigFromModels from '../models/generateReduxConfig';
import ACTION_TYPES from './actionTypes';
import ACTION_CREATORS from './actionCreators';
import HANDLERS from './actionHandlers';

export const INITIAL_STATE = {
  version: '1.0.0',
  isLoading: false,
  model: null,
  page: 0,
  initialized: false,
  modelType: null,
  mapmarkers: [],
};

generateReduxConfigFromModels(MODELS, ACTION_TYPES, ACTION_CREATORS, INITIAL_STATE, HANDLERS);

export const REDUCER = (state = INITIAL_STATE, action) => (
  HANDLERS[action.type]
    ? HANDLERS[action.type](state, action)
    : state
);

export const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
export const configureStore = () => finalCreateStore(REDUCER, INITIAL_STATE);
export const mapStateToProps = state => ({ ...state });
export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(ACTION_CREATORS, dispatch) });

export default configureStore();