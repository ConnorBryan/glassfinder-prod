import ACTION_TYPES from './actionTypes';

export default {
  [ACTION_TYPES.SET_ERROR]: (state, { error }) => ({ ...state, error }),
  [ACTION_TYPES.SET_LOADING]: (state, { isLoading }) => ({ ...state, isLoading }),
  [ACTION_TYPES.SET_INITIALIZED]: state => ({ ...state, initialized: true }),

  [ACTION_TYPES.SET_HAS_PASSED_AGE_GATE]: (state, { hasPassedAgeGate }) => ({ ...state, hasPassedAgeGate }),

  [ACTION_TYPES.SET_MY_ACCOUNT]: (state, { myAccount }) => ({ ...state, myAccount }),

  [ACTION_TYPES.SET_AUTHORIZED]: (state, { authorized }) => ({ ...state, authorized }),
  [ACTION_TYPES.SET_AUTH_TOKEN]: (state, { authToken }) => ({ ...state, authToken }),
  
  [ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL]: (state, { signupFormEmail }) => ({ ...state, signupFormEmail }),
  [ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL_AGAIN]: (state, { signupFormEmailAgain }) => ({ ...state, signupFormEmailAgain }),
  [ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD]: (state, { signupFormPassword }) => ({ ...state, signupFormPassword }),
  [ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD_AGAIN]: (state, { signupFormPasswordAgain }) => ({ ...state, signupFormPasswordAgain }),

  [ACTION_TYPES.SET_SIGN_IN_FORM_EMAIL]: (state, { signinFormEmail }) => ({ ...state, signinFormEmail }),
  [ACTION_TYPES.SET_SIGN_IN_FORM_PASSWORD]: (state, { signinFormPassword }) => ({ ...state, signinFormPassword }),

  [ACTION_TYPES.SET_CHANGE_PASSWORD_FORM_PASSWORD]: (state, { changePasswordFormPassword }) => ({ ...state, changePasswordFormPassword }),
  [ACTION_TYPES.SET_CHANGE_PASSWORD_FORM_PASSWORD_AGAIN]: (state, { changePasswordFormPasswordAgain }) => ({ ...state, changePasswordFormPasswordAgain }),
};