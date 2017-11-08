
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import ForgotPassword from './containers/ForgotPassword';
import ChangePassword from './containers/ChangePassword';
import UserVerification from './containers/UserVerification';
import MyAccount from './containers/MyAccount';
import UploadPiece from './containers/UploadPiece';
import MyPieces from './containers/MyPieces';

export default {
  /*
    O p e r a t i o n s
  */
  API_ROOT: 'http://localhost:6166/api',

  /*
    M o d e l s
  */
  ACCOUNT_TYPES: {
    artist: 'artist',
    headshop: 'headshop',
    brand: 'brand',
  },

  /*
    S t y l i n g
  */
  ICONS: {
    artist: 'paint brush',
    headshop: 'cart',
    brand: 'building',
    piece: 'puzzle',
  },

  /*  
    R o u t i n g
  */
  ROUTES: [
    {
      path: '/',
      Component: Home,
    },
    {
      path: '/sign-in',
      requiresUnauthorized: true,
      Component: SignIn,
    },
    {
      path: '/sign-up',
      requiresUnauthorized: true,
      Component: SignUp,
    },
    {
      path: '/forgot-password',
      requiresUnauthorized: true,
      Component: ForgotPassword,
    },
    {
      path: '/change-password',
      requiresAuthorized: true,
      Component: ChangePassword,
    },
    {
      path: '/user-verification',
      requiresUnauthorized: true,
      Component: UserVerification,
    },
    {
      path: '/my-account',
      requiresAuthorized: true,
      Component: MyAccount,
    },
    {
      path: '/upload-piece',
      requiresAuthorized: true,
      Component: UploadPiece,
    },
    {
      path: '/my-pieces',
      requiresAuthorized: true,
      Component: MyPieces,
    },
  ],

  BREADCRUMBS: {
    '/': [
      {
        pageName: 'Home',
        active: true,
      },
    ],
    '/my-account': [
      {
        pageName: 'My Account',
        active: true,
      },
    ],
    '/change-password': [
      {
        pageName: 'My Account',
        route: '/my-account',
      },
      {
        pageName: 'Change Password',
        active: true,
      },
    ],
    '/upload-piece': [
      {
        pageName: 'My Account',
        route: '/my-account',
      },
      {
        pageName: 'Upload Piece',
        active: true,
      },
    ],
    '/my-pieces': [
      {
        pageName: 'My Account',
        route: '/my-account',
      },
      {
        pageName: 'My Pieces',
        active: true,
      },
    ],
  },

  /*
    C o o k i e s
  */
  AUTH_TOKEN_COOKIE: 'AUTH_TOKEN',
  HAS_PASSED_AGE_GATE_COOKIE: 'HAS_PASSED_AGE_GATE',
  MY_ACCOUNT_COOKIE: 'MY_ACCOUNT',

  /*
    G o o g l e
      M a p s
  */
  DEFAULT_MAP_CONFIG: {
    center: {
      lat: 32.770713,
      lng: -96.795438,
    },
    zoom: 8,
  },
};