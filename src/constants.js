export default {
  // API_ROOT: 'https://glassfinder.com/api',
  API_ROOT: 'http://localhost:6166',
  ASSOCIATIONS: {
    headshop: ['piece', 'company', 'artist'],
    artist: ['piece', 'headshop', 'company'],
    company: ['headshop', 'artist', 'piece'],
    piece: ['artist', 'headshop', 'company'],
  },
  MODEL_TYPES_SINGULAR: ['headshop', 'artist', 'company', 'piece'],
  MODEL_TYPES_PLURAL: ['headshops', 'artists', 'companies', 'pieces'],
  ICONS: {
    headshop: 'cart',
    artist: 'paint brush',
    company: 'building',
    piece: 'puzzle',
  },
  HAS_PASSED_AGE_GATE_COOKIE: 'HAS_PASSED_AGE_GATE',
  DEFAULT_MAP_CONFIG: {
    center: {
      lat: 32.770713,
      lng: -96.795438,
    },
    zoom: 8,
  },
};