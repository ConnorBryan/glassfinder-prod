import {
  applyMiddleware,
  bindActionCreators,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import CONSTANTS from '../constants';
import * as Formatters from '../util/formatters';
import MODELS from '../models';
import generateReduxConfigFromModels from '../models/generateReduxConfig';
import ACTION_TYPES from './actionTypes';
import ACTION_CREATORS from './actionCreators';
import HANDLERS from './actionHandlers';

export const INITIAL_STATE = {
  version: '1.0.0',
  isLoading: false,
  fetchingModels: false,
  model: null,
  page: 0,
  initialized: false,
  modelType: null,
  mapmarkers: [],
};

generateReduxConfigFromModels(MODELS, ACTION_TYPES, ACTION_CREATORS, INITIAL_STATE, HANDLERS);

export const ACTION_HANDLERS = {
  ...ACTION_CREATORS,
  initialize: () => dispatch => {
    dispatch(ACTION_CREATORS.setVersion('1.0.1'));
    dispatch(ACTION_CREATORS.setInitialized());
  },
  loadPage: page => (dispatch, getState) => {
    const { modelType, collectionSize: lastPage } = getState();
    const modelGetter = Formatters.getModelGetter(modelType);

    if ((page < 0) || (page >= lastPage)) return false;

    try {
      dispatch(ACTION_HANDLERS.setLoading(true));
      dispatch(ACTION_HANDLERS.setPage(page));
      dispatch(ACTION_HANDLERS[modelGetter](page));
    } catch (e) {
      dispatch(ACTION_HANDLERS.setError({
        error: e,
        message: `Unable to load page ${page} of ${modelType}`,
      }));
    } finally {
      dispatch(ACTION_HANDLERS.setLoading(false));
    }
  },
  getMapmarkers: () => async dispatch => {
    try {
      const { data } = await axios.get(`${CONSTANTS.API_ROOT}/mapmarkers`);

      dispatch(ACTION_CREATORS.setMapmarkers(data));
    } catch (e) {
      dispatch(ACTION_CREATORS.setError({
        error: e,
        message: `Unable to retrieve mapmarkers`,
      }));
    }
  },
};

export const REDUCER = (state = INITIAL_STATE, action) => (
  HANDLERS[action.type]
    ? HANDLERS[action.type](state, action)
    : state
);

export const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
export const configureStore = () => finalCreateStore(REDUCER, INITIAL_STATE);
export const mapStateToProps = state => ({ ...state });
export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(ACTION_HANDLERS, dispatch) });

export default configureStore();