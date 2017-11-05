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

      if (token) dispatch(ACTION_HANDLERS.authorize(token));

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

      COOKIES.remove(CONSTANTS.AUTH_TOKEN_COOKIE);

      dispatch(ACTION_CREATORS.setAuthorized(false));
      dispatch(ACTION_CREATORS.setAuthToken(null));
    },
    verify: (userId, verificationCode, history) => async dispatch => {
      try {
        const url = `${CONSTANTS.API_ROOT}/users/verify?userId=${userId}&verificationCode=${verificationCode}`;
        const { data } = await axios.post(url);

        if (data.error || !data.success || !data.token) {
          dispatch(ACTION_CREATORS.setError({
              error: data.error,
              message: data.error,
            }))
        } else {
          dispatch(ACTION_HANDLERS.authorize(data.token, history));  
        }
      } catch (e) {
        dispatch(ACTION_CREATORS.setError({
          error: e,
          message: `Unable to verify user`,
        }));
      } finally {
        dispatch(ACTION_HANDLERS.setLoading(false));
      }
    },
    checkAgeGate: () => (dispatch, getState) => {
      const { hasPassedAgeGate } = getState();

      if (hasPassedAgeGate) return;

      const hasPassedAgeGateCookie = COOKIES.get(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE);

      dispatch(ACTION_CREATORS.setHasPassedAgeGate(hasPassedAgeGateCookie));
    },
    passAgeGate: () => dispatch => {
      const hasPassedAgeGateCookie = COOKIES.get(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE);

      if (!hasPassedAgeGateCookie) COOKIES.set(CONSTANTS.HAS_PASSED_AGE_GATE_COOKIE, true, { path: '/' });

      dispatch(ACTION_CREATORS.setHasPassedAgeGate(true));
    },
    signup: () => async (dispatch, getState) => {
      const {
        signupFormEmail: email,
        signupFormEmailAgain: emailAgain,
        signupFormPassword: password,
        signupFormPasswordAgain: passwordAgain,
      } = getState();

      dispatch(ACTION_CREATORS.setError(null));
      dispatch(ACTION_CREATORS.setLoading(true));

      try {
        const { data } = await axios.post(`${CONSTANTS.API_ROOT}/users`, {
          email,
          emailAgain,
          password,
          passwordAgain,
        });

        (data.error || !data.success) && (
          dispatch(ACTION_CREATORS.setError({
            error: data.error,
            message: data.error,
          }))
        );
      } catch (e) {
        dispatch(ACTION_CREATORS.setError({
          error: e,
          message: e.message,
        }));
      } finally {
        dispatch(ACTION_CREATORS.setLoading(false));
      }
    },
    signin: () => async (dispatch, getState) => {
      const {
        signinFormEmail: email,
        signinFormPassword: password,
      } = getState();

      dispatch(ACTION_CREATORS.setError(null));
      dispatch(ACTION_CREATORS.setLoading(true));

      try {
        const { data } = await axios.post(`${CONSTANTS.API_ROOT}/user`, {
          email,
          password,
        });

        (data.error || !data.success || !data.token)
          ? dispatch(ACTION_CREATORS.setError({
              error: data.error,
              message: data.error,
            }))
          : dispatch(ACTION_HANDLERS.authorize(data.token));      

      } catch (e) {
        dispatch(ACTION_CREATORS.setError({
          error: e,
          message: e.message,
        }));
      } finally {
        dispatch(ACTION_CREATORS.setLoading(false));
      }
    },
    changePassword: history => async (dispatch, getState) => {
      const {
        authToken,
        changePasswordFormPassword,
        changePasswordFormPasswordAgain,
      } = getState();

      if (changePasswordFormPassword !== changePasswordFormPasswordAgain) return;

      try {
        const { data } = await axios.post(`${CONSTANTS.API_ROOT}/change-password`, {
          user: {},
          token: authToken,
          password: changePasswordFormPassword,
        });

        history.push('/my-account');
      } catch (e) {
        dispatch(ACTION_CREATORS.setError({
          error: e,
          message: e.message,
        }));
      } finally {
        dispatch(ACTION_CREATORS.setLoading(false));
      }
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