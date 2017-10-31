import axios from 'axios';

import CONSTANTS from '../constants';
import * as Formatters from '../util/formatters';
import ACTION_TYPES from './actionTypes';

const ACTIONS = {
  setError: error => ({ type: ACTION_TYPES.SET_ERROR, error }),
  setVersion: version => ({ type: ACTION_TYPES.SET_VERSION, version }),
  setLoading: isLoading => ({ type: ACTION_TYPES.SET_LOADING, isLoading }),
  setModel: model => ({ type: ACTION_TYPES.SET_MODEL, model }),
  setInitialized: () => ({ type: ACTION_TYPES.SET_INITIALIZED }),
  setPage: page => ({ type: ACTION_TYPES.SET_PAGE, page }),
  setModelType: modelType => ({ type: ACTION_TYPES.SET_MODEL_TYPE, modelType }),
  setCollectionSize: collectionSize => ({ type: ACTION_TYPES.SET_COLLECTION_SIZE, collectionSize }),
  setMapmarkers: mapmarkers => ({ type: ACTION_TYPES.SET_MAPMARKERS, mapmarkers }),
};

export default {
  ...ACTIONS,
  initialize: () => dispatch => {
    dispatch(ACTIONS.setVersion('1.0.1'));
    dispatch(ACTIONS.setInitialized());
  },
  loadPage: page => (dispatch, getState) => {
    const { modelType, collectionSize: lastPage } = getState();
    const modelGetter = Formatters.getModelGetter(modelType);

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