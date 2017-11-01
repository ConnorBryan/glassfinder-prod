export default {
  API_ROOT: 'http://138.197.17.204:6166',
  ASSOCIATIONS: {
    headshop: ['artist', 'company', 'piece'],
    artist: ['headshop', 'company', 'piece'],
    company: ['headshop', 'artist', 'piece'],
    piece: ['headshop', 'artist', 'company'],
  },
  MODEL_TYPES_SINGULAR: ['headshop', 'artist', 'company', 'piece'],
  MODEL_TYPES_PLURAL: ['headshops', 'artists', 'companies', 'pieces'],
  ICONS: {
    headshop: 'cart',
    artist: 'paint brush',
    company: 'building',
    piece: 'puzzle',
  },
};