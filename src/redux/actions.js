import axios from 'axios';
import Cookies from 'universal-cookie';

import CONSTANTS from '../constants';
import ACTION_CREATORS from './actionCreators';
import ACTIONS from './actions';

const COOKIES = new Cookies();

export default {
    ...ACTION_CREATORS,
    
    initialize: () => dispatch => {
      const token = (
        COOKIES.get(CONSTANTS.AUTH_TOKEN_COOKIE) ||
        window.localStorage.getItem(CONSTANTS.AUTH_TOKEN_COOKIE)
      );
      const myAccount = window.localStorage.getItem(CONSTANTS.MY_ACCOUNT_COOKIE);

      if (token && myAccount) {
        dispatch(ACTIONS.setMyAccount(JSON.parse(myAccount)));
        dispatch(ACTIONS.authorize(token));
        setTimeout(() => dispatch(ACTIONS.syncMyAccount()), 1000);
      }

      dispatch(ACTIONS.setInitialized());
    },

    authorize: (token, history) => dispatch => {
      if (!token) throw Error(`Cannot authorize without a token`);

      window.localStorage.setItem(CONSTANTS.AUTH_TOKEN_COOKIE, token);

      COOKIES.set(CONSTANTS.AUTH_TOKEN_COOKIE, token, { path: '/' });

      dispatch(ACTIONS.setAuthorized(true));
      dispatch(ACTIONS.setAuthToken(token));

      history && history.push('/my-account');    
    },

    deauthorize: () => dispatch => {
      window.localStorage.removeItem(CONSTANTS.AUTH_TOKEN_COOKIE);
      window.localStorage.removeItem(CONSTANTS.MY_ACCOUNT_COOKIE);

      COOKIES.remove(CONSTANTS.AUTH_TOKEN_COOKIE);

      dispatch(ACTIONS.setAuthorized(false));
      dispatch(ACTIONS.setAuthToken(null));
      dispatch(ACTIONS.setMyAccount(null));
    },

    checkAgeGate: () => (dispatch, getState) => {
      const { hasPassedAgeGate } = getState();

      if (hasPassedAgeGate) return;

      const hasPassedAgeGateCookie = COOKIES.get(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE);

      dispatch(ACTIONS.setHasPassedAgeGate(hasPassedAgeGateCookie));
    },

    passAgeGate: () => (dispatch, getState) => {
      const hasPassedAgeGateCookie = COOKIES.get(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE);

      if (!hasPassedAgeGateCookie) COOKIES.set(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE, true, { path: '/' });

      dispatch(ACTIONS.setHasPassedAgeGate(true));
    },

    /**
     * @func verify
     * @desc Verify a user account on the server when provided URL params for userId and verificationCode.
     */
    verify: (userId, verificationCode, history) => 
      async (dispatch, getState) =>
        processify(dispatch, async () => {
          const url = `${CONSTANTS.API_ROOT}/users/verify?userId=${userId}&verificationCode=${verificationCode}`;
          const { data: { error, user, token } } = await axios.post(url);

          if (error || !token) {
            dispatch(ACTIONS.setError({
                message: error || `The verification process failed`,
              }))
          } else {
            window.localStorage.setItem(CONSTANTS.MY_ACCOUNT_COOKIE, JSON.stringify(user));

            dispatch(ACTIONS.authorize(token, history));
            dispatch(ACTIONS.setMyAccount(user));
            dispatch(ACTIONS.syncMyAccount());
          }
    }),

    /**
     * @func link
     * @desc For a non-linked user account, permanently associated
     *       with a single Artist, Headshop or Brand.
     */
    link: type =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { authToken, myAccount } = getState();

          const { data: { error } } = await (
            axios.post(`${CONSTANTS.API_ROOT}/users/link`, {
              token: authToken,
              user: JSON.stringify(myAccount),
              type
            })
          );

          error 
            ? dispatch(ACTIONS.setError({
                message: error.message || error,
              }))
            : dispatch(ACTIONS.syncMyAccount());
    }),

    /**
     * @func signup
     * @desc Provide an email and password to create a new user.
     */
    signup: () =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const {
            signupFormEmail: email,
            signupFormEmailAgain: emailAgain,
            signupFormPassword: password,
            signupFormPasswordAgain: passwordAgain,
          } = getState();

          const { data: { error } } = await (
            axios.post(`${CONSTANTS.API_ROOT}/users`, {
              email,
              emailAgain,
              password,
              passwordAgain,
            })
          );

          error && (
            dispatch(ACTIONS.setError({
              error,
              message: error || `The signup process failed`,
            }))
          );
    }),
    
    /**
     * @func signin
     * @desc Grab an email and password, validate through the database, and set the local copy and token.
     */
    signin: () =>
      (dispatch, getState) => 
        processify(dispatch, async () => {
          const { signinFormEmail: email, signinFormPassword: password } = getState();

          const { data: { error, token, user } } = await (
            axios.post(`${CONSTANTS.API_ROOT}/user`, {
              email,
              password,
            })
          );

          if (error || !token) {
            dispatch(ACTIONS.setError({
              error: error,
              message: error || `The sign in process failed`,
            }));
          } else {
            window.localStorage.setItem(CONSTANTS.MY_ACCOUNT_COOKIE, JSON.stringify(user));

            dispatch(ACTIONS.authorize(token));
            dispatch(ACTIONS.setMyAccount(user));
          }
    }),

    /**
     * @func changePassword
     * @desc Self-explanatory.
     */
    changePassword: history =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const {
            authToken,
            changePasswordFormPassword,
            changePasswordFormPasswordAgain,
            myAccount,
          } = getState();

          if (changePasswordFormPassword !== changePasswordFormPasswordAgain) return;
          
          const { data: { error } } = await (
            axios.post(`${CONSTANTS.API_ROOT}/change-password`, {
              user: myAccount,
              token: authToken,
              password: changePasswordFormPassword,
            })
          );

          error
            ? dispatch(ACTIONS.setError({
                message: error || `Unable to change password`
              }))
            : history.push('/my-account');
    }),

    /**
     * @func syncMyAccount
     * @desc Update the locally stored MyAccount property with the latest from the database.
     */
    syncMyAccount: () =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { authToken, myAccount: { email } } = getState();
          
          const { data: { error, user, linkedAccount } } = await (
            axios.post(`${CONSTANTS.API_ROOT}/users/sync`, {
              token: authToken,
              email,
            })
          );

          if (linkedAccount) user.linkedAccount = linkedAccount;

          if (error) {
            dispatch(ACTIONS.setError({
              error: error,
              message: error || `The syncing process failed`,
            }));
          } else {
            dispatch(ACTIONS.setMyAccount(user));
            window.localStorage.setItem(CONSTANTS.MY_ACCOUNT_COOKIE, JSON.stringify(user));
          }
    }),

    /**
     * @func updateField
     * @desc Update a field in the database during profile editing.
     */
    updateField: (fieldKey, newFieldValue) =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { authToken, myAccount } = getState();
          const { linked } = myAccount;

          const { data: { error } } = await (
            axios.post(`${CONSTANTS.API_ROOT}/users/update-field`, {
              token: authToken,
              user: JSON.stringify(myAccount),
              fieldKey,
              newFieldValue,
              linked,
            })
          );

          return error
            ? dispatch(ACTIONS.setError({
                message: error || `Unable to update field`,
              }))
            : dispatch(ACTIONS.syncMyAccount());
    }),
};

/* = = = */

/**
 * @func processify
 * @desc In the context of an action, wrap a series of dispatches in a generic try-catch.
 * @param {function} dispatch 
 * @param {function} process 
 */
export async function processify(dispatch, process) {
  try {
    dispatch(ACTIONS.setLoading(true));
    await process();
  } catch (e) {
    dispatch(ACTIONS.setError({
      error: e,
      message: e.message,
    }));
  } finally {
    dispatch(ACTIONS.setLoading(false));
  }
}