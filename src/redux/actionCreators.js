import ACTION_TYPES from './actionTypes';

export default {
  setError: error => ({ type: ACTION_TYPES.SET_ERROR, error }),
  setLoading: isLoading => ({ type: ACTION_TYPES.SET_LOADING, isLoading }),
  setInitialized: () => ({ type: ACTION_TYPES.SET_INITIALIZED }),

  setHasPassedAgeGate: hasPassedAgeGate => ({ type: ACTION_TYPES.SET_HAS_PASSED_AGE_GATE, hasPassedAgeGate }),

  setMyAccount: myAccount => ({ type: ACTION_TYPES.SET_MY_ACCOUNT, myAccount }),

  setAuthorized: authorized => ({ type: ACTION_TYPES.SET_AUTHORIZED, authorized }),
  setAuthToken: authToken => ({ type: ACTION_TYPES.SET_AUTH_TOKEN, authToken }),

  setSignupFormEmail: signupFormEmail => ({ type: ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL, signupFormEmail }),
  setSignupFormEmailAgain: signupFormEmailAgain => ({ type: ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL_AGAIN, signupFormEmailAgain }),
  setSignupFormPassword: signupFormPassword => ({ type: ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD, signupFormPassword }),
  setSignupFormPasswordAgain: signupFormPasswordAgain => ({ type: ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD_AGAIN, signupFormPasswordAgain }),

  setSigninFormEmail: signinFormEmail => ({ type: ACTION_TYPES.SET_SIGN_IN_FORM_EMAIL, signinFormEmail }),
  setSigninFormPassword: signinFormPassword => ({ type: ACTION_TYPES.SET_SIGN_IN_FORM_PASSWORD, signinFormPassword }),

  setChangePasswordFormPassword: changePasswordFormPassword => ({ type: ACTION_TYPES.SET_CHANGE_PASSWORD_FORM_PASSWORD, changePasswordFormPassword }),
  setChangePasswordFormPasswordAgain: changePasswordFormPasswordAgain => ({ type: ACTION_TYPES.SET_CHANGE_PASSWORD_FORM_PASSWORD_AGAIN, changePasswordFormPasswordAgain }),
};