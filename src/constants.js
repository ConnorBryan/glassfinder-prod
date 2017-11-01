/*
  C o n s t a n t s
*/
export default {
  API_ROOT: 'http://localhost:6166',
  ASSOCIATIONS: {
    headshop: ['artist', 'company', 'piece'],
    artist: ['headshop', 'company', 'piece'],
    company: ['headshop', 'artist', 'piece'],
    piece: ['headshop', 'artist', 'company'],
  },
  ICONS: {
    headshop: 'cart',
    artist: 'paint brush',
    company: 'building',
    piece: 'puzzle',
  },
};