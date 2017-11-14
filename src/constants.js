import ROUTES from './routes';

export default {
  ADMIN: process.env.REACT_APP_ADMIN                                                  || false,
  API_ROOT: process.env.REACT_APP_API_ROOT                                            || 'http://localhost:6166/api',
  V2_API_ROOT: process.env.REACT_APP_V2_API_ROOT                                      || 'http://localhost:6166/api/v2',
  GOOGLE_MAPS_API_KEY: process.env.REACT_GOOGLE_MAPS_API_KEY                          || 'AIzaSyDhcnItQMqZ3K2yeq6bxbNmCbcjyreQDXM',
  GOOGLE_MAPS_GEOLOCATION_API_KEY: process.env.REACT_GOOGLE_MAPS_GEOLOCATION_API_KEY  || 'AIzaSyAJIK5AWaKs9f4ehSV4Wadk_r7n6phI4Ig',

  /*
    M o d e l s
  */
  ACCOUNT_TYPES: {
    artist: 'artist',
    shop: 'shop',
    brand: 'brand',
  },

  /*
    S t y l i n g
  */
  ICONS: {
    artist: 'paint brush',
    shop: 'cart',
    brand: 'building',
    piece: 'puzzle',
    error: 'warning sign',
  },

  /*
    E t
      C e t e r a
  */
  ERROR_TIMEOUT: 2000,
  FETCH_TIMEOUT: 5000,

  /*
    R o u t i n g
  */
  ROUTES,

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