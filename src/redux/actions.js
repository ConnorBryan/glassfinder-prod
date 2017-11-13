import axios from 'axios';
import Cookies from 'universal-cookie';

import CONSTANTS from '../constants';
import flatten from '../utils/flatten';
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

      setTimeout(() => dispatch(ACTIONS.setInitialized()), 1000);
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

    showError: e => (dispatch, getState) => {
      dispatch(ACTIONS.setError({
        error: e,
        message: e.message,
      }));

      setTimeout(() => dispatch(ACTIONS.setError(null)), CONSTANTS.ERROR_TIMEOUT);
    },

    toggleSidebar: () => (dispatch, getState) => {
      const { sidebarVisible } = getState();

      dispatch(ACTIONS.setSidebarVisible(!sidebarVisible));
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
            dispatch(ACTIONS.showError(error));
          } else {
            window.localStorage.setItem(CONSTANTS.MY_ACCOUNT_COOKIE, JSON.stringify(user));

            dispatch(ACTIONS.authorize(token, history));
            dispatch(ACTIONS.setMyAccount(user));

            setTimeout(() => dispatch(ACTIONS.syncMyAccount()), CONSTANTS.ERROR_TIMEOUT);
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
              user: JSON.stringify(flatten(myAccount)),
              type
            })
          );

          error 
            ? dispatch(ACTIONS.showError(error))
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

          error && dispatch(ACTIONS.showError(error));
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
            dispatch(ACTIONS.showError(error));
          } else {
            window.localStorage.setItem(CONSTANTS.MY_ACCOUNT_COOKIE, JSON.stringify(user));

            dispatch(ACTIONS.authorize(token));
            dispatch(ACTIONS.setMyAccount(user));

            setTimeout(() => dispatch(ACTIONS.syncMyAccount()), CONSTANTS.ERROR_TIMEOUT);
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
              user: JSON.stringify(flatten(myAccount)),
              token: authToken,
              password: changePasswordFormPassword,
            })
          );

          error
            ? dispatch(ACTIONS.showError(error))
            : history.push('/my-account');
    }),

    /**
     * @func syncMyAccount
     * @desc Update the locally stored MyAccount property with the latest from the database.
     */
    syncMyAccount: () =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { authToken, myAccount } = getState();
          const { email } = flatten(myAccount);

          const { data: { error, user, linkedAccount, pieces } } = await (
            axios.post(`${CONSTANTS.API_ROOT}/users/sync`, {
              token: authToken,
              email,
            })
          );

          if (linkedAccount) user.linkedAccount = linkedAccount;
          if (pieces) user.pieces = pieces;

          if (error) {
            dispatch(ACTIONS.showError(error));
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
          const { linked } = flatten(myAccount);

          const { data: { error } } = await (
            axios.post(`${CONSTANTS.API_ROOT}/users/update-field`, {
              token: authToken,
              user: JSON.stringify(flatten(myAccount)),
              fieldKey,
              newFieldValue,
              linked,
            })
          );

          return error
            ? dispatch(ACTIONS.showError(error))
            : dispatch(ACTIONS.syncMyAccount());
    }),

    /**
     * @func uploadPiece
     * @desc Create a new piece in the database associated with the active user. 
     */
    uploadPiece: () =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const {
            myAccount,
            authToken: token,
            uploadPieceFormImage: image,
            uploadPieceFormTitle: title,
            uploadPieceFormPrice: price,
            uploadPieceFormDescription: description,
          } = getState();

          const formData = new FormData();

          formData.append('user', JSON.stringify(flatten(myAccount)));
          formData.append('image', image);
          formData.append('title', title);
          formData.append('price', price);
          formData.append('description', description);

          const { data: { error } } = await (
            axios.post(`${CONSTANTS.API_ROOT}/users/upload-piece`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': token,
              },
            })
          );

          error
            ? dispatch(ACTIONS.showError(error))
            : dispatch(ACTIONS.syncMyAccount());
    }),

    /**
     * @func deletePiece
     * @desc Delete a piece in the database based on a given id.
     * @param {number | string} id
     */
    deletePiece: id =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { piecesById } = getState();
          const localPiece = piecesById.get(id);

          const { data: { error } } = await (
            axios.delete(`${CONSTANTS.API_ROOT}/piece/${id}`)
          );
          
          if (localPiece) dispatch(ACTIONS.setPiece(null, id));

          error
            ? dispatch(ACTIONS.showError(error))
            : dispatch(ACTIONS.syncMyAccount());
    }),

    /**
     * @func exploreShops
     * @desc Browse existing shops on the site in progressively more detail. 
     */
    exploreShops: () =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { data: { error, shops } } = await axios.get(`${CONSTANTS.API_ROOT}/shops`);
          
          error
            ? dispatch(ACTIONS.showError(error))
            : dispatch(ACTIONS.setLocalShops(shops));
    }),

    /**
     * @func explorePieces
     * @desc Browse existing pieces on the site in progressively more detail. 
     */
    explorePieces: () =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { data: { error, pieces } } = await axios.get(`${CONSTANTS.API_ROOT}/pieces`);

          if (error) {
            dispatch(ACTIONS.showError(error));
          } else {
            dispatch(ACTIONS.setLocalPiecesPage(1));
            dispatch(ACTIONS.setLocalPieces(pieces));
          }
    }),

    /**
     * @func fetchArtist
     * @desc Grab a single artist from the database and set it locally.
     * @param {number} id - Which artist should be retrieved?
     */
    fetchArtist: id =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          if (!id) return;

          const { data: { success, message, artist, pieces } } = await axios.get(`${CONSTANTS.API_ROOT}/artist/${id}`);
          
          if (!success) {
            dispatch(ACTIONS.showError({ message }));
          } else {
            artist.pieces = pieces;
            
            dispatch(ACTIONS.setArtist(artist));
            dispatch(ACTIONS.setActiveArtist(artist.id));
            dispatch(ACTIONS.fetchPieces(pieces));
          }
    }),

    /**
     * @func fetchShop
     * @desc Grab a single shop from the database and set it locally.
     * @param {number} id - Which shop should be retrieved?
     */
    fetchShop: id =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          if (!id) return;

          const { data: { success, message, shop, pieces } } = await axios.get(`${CONSTANTS.API_ROOT}/shop/${id}`);
          
          if (!success) {
            dispatch(ACTIONS.showError({ message }));
          } else {
            shop.pieces = pieces;
            
            dispatch(ACTIONS.setShop(shop));
            dispatch(ACTIONS.setActiveShop(shop.id));
            dispatch(ACTIONS.fetchPieces(pieces));
          }
    }),

    /**
     * @func fetchPieces
     * @desc Given an array of pieceIds, fetch the ones we don't have locally and set them accordingly.
     * @param {Array<number>} pieceIds - The IDs to check and potentially fetch.
     */
    fetchPieces: pieceIds =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { fetchingPieces, piecesById } = getState();

          if (fetchingPieces) return;

          dispatch(ACTIONS.setFetchingPieces(true));

          const pieceIdsToFetch = pieceIds.filter(id => !piecesById.get(id));
          
          const url = pieceIdsToFetch
            .reduce((urlString, pieceId) => urlString += `${pieceId},`, `${CONSTANTS.API_ROOT}/pieces?ids=`);

          const { data: { success, message, pieces } } = await axios.get(url.substr(0, url.length - 1));

          success
            ? pieces.forEach(piece => dispatch(ACTIONS.setPiece(piece)))
            : dispatch(ACTIONS.showError({ message }));
          
          dispatch(ACTIONS.setFetchingPieces(false));
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
    dispatch(ACTIONS.showError(e));
  } finally {
    dispatch(ACTIONS.setLoading(false));
  }
}