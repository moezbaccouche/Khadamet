const initialState = {chatSocket: {}};

export default function setChatSocket(state = initialState, action) {
  let nextState = {};
  switch (action.type) {
    case 'SET_CHAT_SOCKET':
      nextState = {
        ...state,
        chatSocket: action.value,
      };
      return nextState || state;

    default:
      return state;
  }
}
