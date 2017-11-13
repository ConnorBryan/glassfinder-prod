
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import ForgotPassword from './containers/ForgotPassword';
import ChangePassword from './containers/ChangePassword';
import UserVerification from './containers/UserVerification';
import MyAccount from './containers/MyAccount';
import UploadPiece from './containers/UploadPiece';
import ExploreShops from './containers/ExploreShops';
import ExplorePieces from './containers/ExplorePieces';
import MyPieces from './containers/MyPieces';
import ArtistProfile from './containers/ArtistProfile';
import ShopProfile from './containers/ShopProfile';
import UserRedirect from './containers/UserRedirect';
import Help from './containers/Help';
import Contact from './containers/Contact';
import SocialMedia from './containers/SocialMedia';
import Purchase from './containers/Purchase';
import PieceDetail from './containers/PieceDetail';

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
    pageHeader: {
      icon: 'child',
      title: 'Welcome to Glassfinder',
      description: 'Take some time to explore our shops and pieces. If you need help, navigate to the "Help" page using the navigation above.',
    },
  },
  {
    path: '/help',
    Component: Help,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Help',
        active: true,
      },
    ],
    pageHeader: {
      icon: 'help circle',
      title: 'Help',
      description: 'Frequently asked questions related to Glassfinder.',
    },
  },
  {
    path: '/contact',
    Component: Contact,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Contact',
        active: true,
      },
    ],
    pageHeader: {
      icon: 'envelope',
      title: 'Contact',
      description: 'Here\'s how to get in touch.',
    },
  },
  {
    path: '/social-media',
    Component: SocialMedia,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Social media',
        active: true,
      },
    ],
    pageHeader: {
      icon: 'users',
      title: 'Social Media',
      description: 'Find Glassfinder all over the place.',
    },
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
    pageHeader: {
      icon: 'eye',
      title: 'User Verification',
      description: '',
    },
  },
  {
    path: '/explore-pieces',
    Component: ExplorePieces,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Explore pieces',
        active: true,
      },
    ],
    pageHeader: {
      icon: 'puzzle',
      title: 'Explore Pieces',
      description: 'The perfect piece for you is just waiting to be discovered.',
    },
  },
  {
    path: '/explore-shops',
    Component: ExploreShops,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Explore shops',
        active: true,
      },
    ],
    pageHeader: {
      icon: 'shopping cart',
      title: 'Explore Shops',
      description: 'Support local business and buy your glass from the folks who know it best.',
    },
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
        pageName: 'My account',
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
        pageName: 'My account',
        active: true,
      },
    ],
    pageHeader: {
      icon: 'user',
      title: 'My Account',
      description: 'Make changes to your account, upload pieces, and more.',
    },
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
        pageName: 'My account',
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
        pageName: 'My account',
        route: '/my-account',
      },
      {
        pageName: 'My Pieces',
        active: true,
      },
    ],
    pageHeader: {
      icon: 'puzzle',
      title: 'My Pieces',
      description: 'Here you can view pieces you\'ve uploaded, as well as make changes.',
    },
  },
  {
    path: '/u/:id?',
    Component: UserRedirect,
  },
  {
    path: '/a/:id?',
    Component: ArtistProfile,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Artists',
        route: '/explore-pieces',
      },
      {
        pageName: 'Artist',
        active: true,
      },
    ],
  },
  {
    path: '/s/:id?',
    Component: ShopProfile,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Shops',
        route: '/explore-shops',
      },
      {
        pageName: 'Shop',
        active: true,
      },
    ],
  },
    {
    path: '/p/:id?',
    Component: PieceDetail,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Piece',
        active: true,
      },
    ],
  },
  {
    path: '/purchase/:id?',
    Component: Purchase,
    breadcrumbs: [
      {
        pageName: 'Home',
        route: '/',
      },
      {
        pageName: 'Purchase',
        active: true,
      },
    ],
    pageHeader: {
      icon: 'dollar',
      title: 'Purchase',
      description: 'It looks like you\'ve found exactly what you were looking for.',
    },
  },
];
