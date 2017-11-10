import ACTION_TYPES from './actionTypes';

export default {
  setError: error => ({ type: ACTION_TYPES.SET_ERROR, error }),
  setLoading: isLoading => ({ type: ACTION_TYPES.SET_LOADING, isLoading }),
  setInitialized: () => ({ type: ACTION_TYPES.SET_INITIALIZED }),
  setHasPassedAgeGate: hasPassedAgeGate => ({ type: ACTION_TYPES.SET_HAS_PASSED_AGE_GATE, hasPassedAgeGate }),
  setMyAccount: myAccount => ({ type: ACTION_TYPES.SET_MY_ACCOUNT, myAccount }),
  setAuthorized: authorized => ({ type: ACTION_TYPES.SET_AUTHORIZED, authorized }),
  setAuthToken: authToken => ({ type: ACTION_TYPES.SET_AUTH_TOKEN, authToken }),
  
  /*
    S i g n
      U p
  */
  setSignupFormEmail: signupFormEmail => ({ type: ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL, signupFormEmail }),
  setSignupFormEmailAgain: signupFormEmailAgain => ({ type: ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL_AGAIN, signupFormEmailAgain }),
  setSignupFormPassword: signupFormPassword => ({ type: ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD, signupFormPassword }),
  setSignupFormPasswordAgain: signupFormPasswordAgain => ({ type: ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD_AGAIN, signupFormPasswordAgain }),
  
  /*
    S i g n
      I n
  */
  setSigninFormEmail: signinFormEmail => ({ type: ACTION_TYPES.SET_SIGN_IN_FORM_EMAIL, signinFormEmail }),
  setSigninFormPassword: signinFormPassword => ({ type: ACTION_TYPES.SET_SIGN_IN_FORM_PASSWORD, signinFormPassword }),
  
  /*
    C h a n g e
      P a s s w o r d
  */
  setChangePasswordFormPassword: changePasswordFormPassword => ({ type: ACTION_TYPES.SET_CHANGE_PASSWORD_FORM_PASSWORD, changePasswordFormPassword }),
  setChangePasswordFormPasswordAgain: changePasswordFormPasswordAgain => ({ type: ACTION_TYPES.SET_CHANGE_PASSWORD_FORM_PASSWORD_AGAIN, changePasswordFormPasswordAgain }),

  /*
    U p l o a d
      P i e c e
  */
  setUploadPieceFormImage: uploadPieceFormImage => ({ type: ACTION_TYPES.SET_UPLOAD_PIECE_FORM_IMAGE, uploadPieceFormImage }),
  setUploadPieceFormTitle: uploadPieceFormTitle => ({ type: ACTION_TYPES.SET_UPLOAD_PIECE_FORM_TITLE, uploadPieceFormTitle }),
  setUploadPieceFormPrice: uploadPieceFormPrice => ({ type: ACTION_TYPES.SET_UPLOAD_PIECE_FORM_PRICE, uploadPieceFormPrice }),
  setUploadPieceFormDescription: uploadPieceFormDescription => ({ type: ACTION_TYPES.SET_UPLOAD_PIECE_FORM_DESCRIPTION, uploadPieceFormDescription }),

  /*
    E x p l o r e
      P i e c e s
  */
  setLocalPieces: localPieces => ({ type: ACTION_TYPES.SET_LOCAL_PIECES, localPieces }),
  setLocalPiecesPage: localPiecesPage => ({ type: ACTION_TYPES.SET_LOCAL_PIECES_PAGE, localPiecesPage }),

  /*
    A r t i s t s
  */
  setArtist: artist => ({ type: ACTION_TYPES.SET_ARTIST, artist }),
};