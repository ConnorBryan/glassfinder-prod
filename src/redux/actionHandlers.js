import ACTION_TYPES from './actionTypes';

export default {
  [ACTION_TYPES.SET_ERROR]: (state, { error }) => ({ ...state, error }),
  [ACTION_TYPES.SET_LOADING]: (state, { isLoading }) => ({ ...state, isLoading }),
  [ACTION_TYPES.SET_INITIALIZED]: state => ({ ...state, initialized: true }),
  [ACTION_TYPES.SET_HAS_PASSED_AGE_GATE]: (state, { hasPassedAgeGate }) => ({ ...state, hasPassedAgeGate }),
  [ACTION_TYPES.SET_MY_ACCOUNT]: (state, { myAccount }) => ({ ...state, myAccount }),
  [ACTION_TYPES.SET_AUTHORIZED]: (state, { authorized }) => ({ ...state, authorized }),
  [ACTION_TYPES.SET_AUTH_TOKEN]: (state, { authToken }) => ({ ...state, authToken }),
  
  /*
    S i g n
      U p
  */
  [ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL]: (state, { signupFormEmail }) => ({ ...state, signupFormEmail }),
  [ACTION_TYPES.SET_SIGN_UP_FORM_EMAIL_AGAIN]: (state, { signupFormEmailAgain }) => ({ ...state, signupFormEmailAgain }),
  [ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD]: (state, { signupFormPassword }) => ({ ...state, signupFormPassword }),
  [ACTION_TYPES.SET_SIGN_UP_FORM_PASSWORD_AGAIN]: (state, { signupFormPasswordAgain }) => ({ ...state, signupFormPasswordAgain }),
  
  /*
    S i g n
      I n
  */
  [ACTION_TYPES.SET_SIGN_IN_FORM_EMAIL]: (state, { signinFormEmail }) => ({ ...state, signinFormEmail }),
  [ACTION_TYPES.SET_SIGN_IN_FORM_PASSWORD]: (state, { signinFormPassword }) => ({ ...state, signinFormPassword }),
  
  /*
    C h a n g e
      P a s s w o r d
  */
  [ACTION_TYPES.SET_CHANGE_PASSWORD_FORM_PASSWORD]: (state, { changePasswordFormPassword }) => ({ ...state, changePasswordFormPassword }),
  [ACTION_TYPES.SET_CHANGE_PASSWORD_FORM_PASSWORD_AGAIN]: (state, { changePasswordFormPasswordAgain }) => ({ ...state, changePasswordFormPasswordAgain }),

  /*
    U p l o a d
      P i e c e
  */
  [ACTION_TYPES.SET_UPLOAD_PIECE_FORM_IMAGE]: (state, { uploadPieceFormImage }) => ({ ...state, uploadPieceFormImage }),
  [ACTION_TYPES.SET_UPLOAD_PIECE_FORM_TITLE]: (state, { uploadPieceFormTitle }) => ({ ...state, uploadPieceFormTitle }),
  [ACTION_TYPES.SET_UPLOAD_PIECE_FORM_PRICE]: (state, { uploadPieceFormPrice }) => ({ ...state, uploadPieceFormPrice }),
  [ACTION_TYPES.SET_UPLOAD_PIECE_FORM_DESCRIPTION]: (state, { uploadPieceFormDescription }) => ({ ...state, uploadPieceFormDescription }),

  /*
    E x p l o r e
      S h o p s 
  */
  [ACTION_TYPES.SET_LOCAL_SHOPS]: (state, { localShops }) => ({ ...state, localShops }),
  [ACTION_TYPES.SET_LOCAL_SHOPS_PAGE]: (state, { localShopsPage }) => ({ ...state, localShopsPage }),

  /*
    E x p l o r e
      P i e c e s
  */
  [ACTION_TYPES.SET_LOCAL_PIECES]: (state, { localPieces }) => ({ ...state, localPieces }),
  [ACTION_TYPES.SET_LOCAL_PIECES_PAGE]: (state, { localPiecesPage }) => ({ ...state, localPiecesPage }),

  /*
    A r t i s t s
  */
  [ACTION_TYPES.SET_ARTIST]: (state, { artist }) => {
    const { artistsById } = state;
    const { id } = artist;

    if (!id) throw Error(`Attempted to call SET_ARTIST on invalid artist`);

    artistsById.set(id, artist);

    return { ...state, artistsById };
  },
  [ACTION_TYPES.SET_ACTIVE_ARTIST]: (state, { artistId }) => ({ ...state, activeArtist: artistId }),

  /*
    S h o p s
  */
  [ACTION_TYPES.SET_SHOP]: (state, { shop }) => {
    const { shopsById } = state;
    const { id } = shop;

    if (!id) throw Error(`Attempted to call SET_SHOP on invalid shop`);

    shopsById.set(id, shop);

    return { ...state, shopsById };
  },
  [ACTION_TYPES.SET_ACTIVE_SHOP]: (state, { shopId }) => ({ ...state, activeShop: shopId }),

  /*
    P i e c e s
  */
  [ACTION_TYPES.SET_PIECE]: (state, { piece }) => {
    const { piecesById } = state;
    const { id } = piece;

    if (!id) throw Error(`Attempted to call SET_PIECE on invalid piece`);

    piecesById.set(id, piece);

    return { ...state, piecesById };
  },
  [ACTION_TYPES.SET_ACTIVE_PIECE]: (state, { pieceId }) => ({ ...state, activePiece: pieceId }),
  [ACTION_TYPES.SET_FETCHING_PIECES]: (state, { fetchingPieces }) => ({ ...state, fetchingPieces }),
};