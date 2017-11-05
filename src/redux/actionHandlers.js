import ACTION_TYPES from './actionTypes';

export default {
  [ACTION_TYPES.SET_HAS_PASSED_AGE_GATE]: (state, { hasPassedAgeGate }) => ({ ...state, hasPassedAgeGate }),
  [ACTION_TYPES.SET_VERSION]: (state, { version }) => ({ ...state, version }),
  [ACTION_TYPES.SET_LOADING]: (state, { isLoading }) => ({ ...state, isLoading }),
  [ACTION_TYPES.SET_FETCHING_MODELS]: (state, { fetchingModels }) => ({ ...state, fetchingModels }),
  [ACTION_TYPES.SET_ERROR]: (state, { error }) => ({ ...state, error }),
  [ACTION_TYPES.SET_MODEL]: (state, { model }) => ({ ...state, model }),
  [ACTION_TYPES.SET_PAGE]: (state, { page }) => ({ ...state, page }),
  [ACTION_TYPES.SET_MODEL_TYPE]: (state, { modelType }) => ({ ...state, modelType }),
  [ACTION_TYPES.SET_COLLECTION_SIZE]: (state, { collectionSize }) => ({ ...state, collectionSize }),
  [ACTION_TYPES.SET_MAPMARKERS]: (state, { mapmarkers }) => ({ ...state, mapmarkers }),
  [ACTION_TYPES.SET_INITIALIZED]: state => ({ ...state, initialized: true }),


  [ACTION_TYPES.SET_AUTHORIZED]: (state, { authorized }) => ({ ...state, authorized }),
  [ACTION_TYPES.SET_AUTH_TOKEN]: (state, { authToken }) => ({ ...state, authToken }),
  
  [ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL]: (state, { signupFormEmail }) => ({ ...state, signupFormEmail }),
  [ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL_AGAIN]: (state, { signupFormEmailAgain }) => ({ ...state, signupFormEmailAgain }),
  [ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD]: (state, { signupFormPassword }) => ({ ...state, signupFormPassword }),
  [ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD_AGAIN]: (state, { signupFormPasswordAgain }) => ({ ...state, signupFormPasswordAgain }),

  [ACTION_TYPES.SET_SIGN_IN_FORM_EMAIL]: (state, { signinFormEmail }) => ({ ...state, signinFormEmail }),
  [ACTION_TYPES.SET_SIGN_IN_FORM_PASSWORD]: (state, { signinFormPassword }) => ({ ...state, signinFormPassword }),
};