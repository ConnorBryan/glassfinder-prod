
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import ForgotPassword from './containers/ForgotPassword';
import ChangePassword from './containers/ChangePassword';
import UserVerification from './containers/UserVerification';
import MyAccount from './containers/MyAccount';
import UploadPiece from './containers/UploadPiece';
import MyPieces from './containers/MyPieces';

export default [
  {
    path: '/',
    Component: Home,
    breadcrumbs: [
      {
        pageName: 'Home',
        active: true,
      },
    ],
  },
  {
    path: '/sign-in',
    requiresUnauthorized: true,
    Component: SignIn,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Sign in',
        active: true,
      },
    ],
  },
  {
    path: '/sign-up',
    requiresUnauthorized: true,
    Component: SignUp,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Sign up',
        active: true,
      },
    ],
  },
  {
    path: '/forgot-password',
    requiresUnauthorized: true,
    Component: ForgotPassword,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Forgot password',
        active: true,
      },
    ],
  },
  {
    path: '/user-verification',
    requiresUnauthorized: true,
    Component: UserVerification,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'User verification',
        active: true,
      },
    ],
  },
  {
    path: '/change-password',
    requiresAuthorized: true,
    Component: ChangePassword,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'My Account',
        route: '/my-account',
      },
      {
        pageName: 'Change Password',
        active: true,
      },
    ],
  },
  {
    path: '/my-account',
    requiresAuthorized: true,
    Component: MyAccount,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'My Account',
        active: true,
      },
    ],
  },
  {
    path: '/upload-piece',
    requiresAuthorized: true,
    Component: UploadPiece,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'My Account',
        route: '/my-account',
      },
      {
        pageName: 'Upload Piece',
        active: true,
      },
    ],
  },
  {
    path: '/my-pieces',
    requiresAuthorized: true,
    Component: MyPieces,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
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
];
