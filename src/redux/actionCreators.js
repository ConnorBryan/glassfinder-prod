import ACTION_TYPES from './actionTypes';

export default {
  setHasPassedAgeGate: hasPassedAgeGate => ({ type: ACTION_TYPES.SET_HAS_PASSED_AGE_GATE, hasPassedAgeGate }),
  setError: error => ({ type: ACTION_TYPES.SET_ERROR, error }),
  setVersion: version => ({ type: ACTION_TYPES.SET_VERSION, version }),
  setLoading: isLoading => ({ type: ACTION_TYPES.SET_LOADING, isLoading }),
  setFetchingModels: fetchingModels => ({ type: ACTION_TYPES.SET_FETCHING_MODELS, fetchingModels }),
  setModel: model => ({ type: ACTION_TYPES.SET_MODEL, model }),
  setInitialized: () => ({ type: ACTION_TYPES.SET_INITIALIZED }),
  setPage: page => ({ type: ACTION_TYPES.SET_PAGE, page }),
  setModelType: modelType => ({ type: ACTION_TYPES.SET_MODEL_TYPE, modelType }),
  setCollectionSize: collectionSize => ({ type: ACTION_TYPES.SET_COLLECTION_SIZE, collectionSize }),
  setMapmarkers: mapmarkers => ({ type: ACTION_TYPES.SET_MAPMARKERS, mapmarkers }),
};