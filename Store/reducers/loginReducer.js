export const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        userId: action.userId,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userToken: action.token,
        userId: action.userId,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userToken: null,
        userId: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userToken: action.token,
        userId: action.userId,
        isLoading: false,
      };

    default:
      return prevState;
  }
};
