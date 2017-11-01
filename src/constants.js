export default {
  API_ROOT: 'https://glassfinder.com/api',
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