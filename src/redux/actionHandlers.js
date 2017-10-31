import ACTION_TYPES from './actionTypes';

export default {
  [ACTION_TYPES.SET_VERSION]: (state, { version }) => ({ ...state, version }),
  [ACTION_TYPES.SET_LOADING]: (state, { isLoading }) => ({ ...state, isLoading }),
  [ACTION_TYPES.SET_MODEL]: (state, { model }) => ({ ...state, model }),
  [ACTION_TYPES.SET_PAGE]: (state, { page }) => ({ ...state, page }),
  [ACTION_TYPES.SET_MODEL_TYPE]: (state, { modelType }) => ({ ...state, modelType }),
  [ACTION_TYPES.SET_COLLECTION_SIZE]: (state, { collectionSize }) => ({ ...state, collectionSize }),
  [ACTION_TYPES.SET_MAPMARKERS]: (state, { mapmarkers }) => ({ ...state, mapmarkers }),
  [ACTION_TYPES.SET_INITIALIZED]: state => ({ ...state, initialized: true }),
};