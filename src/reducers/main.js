const initialState = { name: 'bob' };

const A = {
  type: 'a',
  payload: {}
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case 'a':
      state.name = 'craig';
      return state;
    default: return state;
  }
}