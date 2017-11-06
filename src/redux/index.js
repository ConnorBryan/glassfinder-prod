import {
  applyMiddleware,
  bindActionCreators,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import Cookies from 'universal-cookie';

import CONSTANTS from '../constants';
import * as Formatters from '../util/formatters';
import MODELS from '../models';
import generateReduxConfigFromModels from '../models/generateReduxConfig';
import ACTION_TYPES from './actionTypes';
import ACTION_CREATORS from './actionCreators';
import HANDLERS from './actionHandlers';

const COOKIES = new Cookies();

export const INITIAL_STATE = {
  hasPassedAgeGate: !!COOKIES.get(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE),
  version: '1.0.0',
  isLoading: false,
  fetchingModels: false,
  model: null,
  page: 0,
  initialized: false,
  modelType: null,
  mapmarkers: [],
};

generateReduxConfigFromModels(
  MODELS,
  ACTION_TYPES,
  ACTION_CREATORS,
  INITIAL_STATE,
  HANDLERS
);

export const ACTION_HANDLERS = {
    ...ACTION_CREATORS,
    initialize: () => dispatch => {
      const token = (
        COOKIES.get(CONSTANTS.AUTH_TOKEN_COOKIE) ||
        window.localStorage.getItem(CONSTANTS.AUTH_TOKEN_COOKIE)
      );
      const myAccount = window.localStorage.getItem(CONSTANTS.MY_ACCOUNT_COOKIE);

      if (token && myAccount) {
        dispatch(ACTION_HANDLERS.setMyAccount(JSON.parse(myAccount)));
        dispatch(ACTION_HANDLERS.authorize(token));
      }

      dispatch(ACTION_CREATORS.setInitialized());
    },
    authorize: (token, history) => dispatch => {
      if (!token) throw Error(`Cannot authorize without a token`);

      window.localStorage.setItem(CONSTANTS.AUTH_TOKEN_COOKIE, token);

      COOKIES.set(CONSTANTS.AUTH_TOKEN_COOKIE, token, { path: '/' });

      dispatch(ACTION_CREATORS.setAuthorized(true));
      dispatch(ACTION_CREATORS.setAuthToken(token));

      history && history.push('/my-account');    
    },
    deauthorize: () => dispatch => {
      window.localStorage.removeItem(CONSTANTS.AUTH_TOKEN_COOKIE);
      window.localStorage.removeItem(CONSTANTS.MY_ACCOUNT_COOKIE);

      COOKIES.remove(CONSTANTS.AUTH_TOKEN_COOKIE);

      dispatch(ACTION_CREATORS.setAuthorized(false));
      dispatch(ACTION_CREATORS.setAuthToken(null));
      dispatch(ACTION_CREATORS.setMyAccount(null));
    },
    checkAgeGate: () => (dispatch, getState) => {
      const { hasPassedAgeGate } = getState();

      if (hasPassedAgeGate) return;

      const hasPassedAgeGateCookie = COOKIES.get(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE);

      dispatch(ACTION_CREATORS.setHasPassedAgeGate(hasPassedAgeGateCookie));
    },
    passAgeGate: () => (dispatch, getState) => {
      const hasPassedAgeGateCookie = COOKIES.get(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE);

      if (!hasPassedAgeGateCookie) COOKIES.set(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE, true, { path: '/' });

      dispatch(ACTION_CREATORS.setHasPassedAgeGate(true));
    },

    /**
     * @func verify
     * @desc Verify a user account on the server when provided URL params for userId and verificationCode.
     */
    verify: (userId, verificationCode, history) => async (dispatch, getState) => {
      processify(dispatch, async () => {
        dispatch(ACTION_CREATORS.setError(null));

        const url = `${CONSTANTS.API_ROOT}/users/verify?userId=${userId}&verificationCode=${verificationCode}`;
        const { data: { error, user, token } } = await axios.post(url);

        if (error || !token) {
          dispatch(ACTION_CREATORS.setError({
              message: error || `The verification process failed`,
            }))
        } else {
          window.localStorage.setItem(CONSTANTS.MY_ACCOUNT_COOKIE, JSON.stringify(user));

          dispatch(ACTION_HANDLERS.authorize(token, history));
          dispatch(ACTION_HANDLERS.setMyAccount(user));
        }
      });
    },

    /**
     * @func link
     * @desc For a non-linked user account, permanently associated
     *       with a single Artist, Headshop or Brand.
     */
    link: type => async (dispatch, getState) => {
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
          ? dispatch(ACTION_CREATORS.setError({
              message: error.message || error,
            }))
          : dispatch(ACTION_HANDLERS.syncMyAccount());
      });
    },

    /**
     * @func signup
     * @desc Provide an email and password to create a new user.
     */
    signup: () => async (dispatch, getState) => {
      processify(dispatch, async () => {
        const {
          signupFormEmail: email,
          signupFormEmailAgain: emailAgain,
          signupFormPassword: password,
          signupFormPasswordAgain: passwordAgain,
        } = getState();

        dispatch(ACTION_CREATORS.setError(null));
        dispatch(ACTION_CREATORS.setLoading(true));

        const { data: { error } } = await (
          axios.post(`${CONSTANTS.API_ROOT}/users`, {
            email,
            emailAgain,
            password,
            passwordAgain,
          })
        );

        error && (
          dispatch(ACTION_CREATORS.setError({
            error,
            message: error || `The signup process failed`,
          }))
        );
      });
    },

    /**
     * @func signin
     * @desc Grab an email and password, validate through the database, and set the local copy and token.
     */
    signin: () => async (dispatch, getState) => {
      processify(dispatch, async () => {
        const {
          signinFormEmail: email,
          signinFormPassword: password,
        } = getState();

        dispatch(ACTION_CREATORS.setError(null));
        dispatch(ACTION_CREATORS.setLoading(true));

        const { data: { error, token, user } } = await (
          axios.post(`${CONSTANTS.API_ROOT}/user`, {
            email,
            password,
          })
        );

        if (error || !token) {
          dispatch(ACTION_CREATORS.setError({
            error: error,
            message: error || `The sign in process failed`,
          }));
        } else {
          window.localStorage.setItem(CONSTANTS.MY_ACCOUNT_COOKIE, JSON.stringify(user));
          
          dispatch(ACTION_HANDLERS.authorize(token));
          dispatch(ACTION_CREATORS.setMyAccount(user));
        }
      });
    },

    /**
     * @func changePassword
     * @desc Self-explanatory.
     */
    changePassword: history => async (dispatch, getState) => {
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
          ? dispatch(ACTION_CREATORS.setError({
              message: error || `Unable to change password`
            }))
          : history.push('/my-account');
      });
    },

    /**
     * @func syncMyAccount
     * @desc Update the locally stored MyAccount property with the latest from the database.
     */
    syncMyAccount: () => (dispatch, getState) => {
      processify(dispatch, async () => {
        const { authToken, myAccount: { email } } = getState();
        
        const { data: { error, user } } = await (
          axios.post(`${CONSTANTS.API_ROOT}/users/sync`, {
            token: authToken,
            email,
          })
        );

        if (error) {
          dispatch(ACTION_CREATORS.setError({
            error: error,
            message: error || `The syncing process failed`,
          }));
        } else {
          dispatch(ACTION_CREATORS.setMyAccount(user));
          window.localStorage.setItem(CONSTANTS.MY_ACCOUNT_COOKIE, JSON.stringify(user));
        }
      });
    },

    // Old
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

/* = = = */

/**
 * @func processify
 * @desc In the context of an action, wrap a series of dispatches in a generic try-catch.
 * @param {function} dispatch 
 * @param {function} process 
 */
export function processify(dispatch, process) {
  try {
    process();
  } catch (e) {
    dispatch(ACTION_CREATORS.setError({
      error: e,
      message: e.message,
    }));
  } finally {
    dispatch(ACTION_CREATORS.setLoading(false));
  }
}