
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import ForgotPassword from './containers/ForgotPassword';
import ChangePassword from './containers/ChangePassword';
import UserVerification from './containers/UserVerification';
import MyAccount from './containers/MyAccount';

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
  ],

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