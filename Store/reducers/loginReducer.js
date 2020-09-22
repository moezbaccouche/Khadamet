export const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };

    default:
      return prevState;
  }
};
