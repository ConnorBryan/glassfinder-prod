export default {
  API_ROOT: 'https://glassfinder.com/api',
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
};