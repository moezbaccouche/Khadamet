const initialState = {loggedUser: {}};

export default function setLoggedUser(state = initialState, action) {
  let nextState = {};
  switch (action.type) {
    case 'SET_LOGGED_USER':
      nextState = {
        ...state,
        loggedUser: action.value,
      };
      return nextState || state;

    default:
      return state;
  }
}
