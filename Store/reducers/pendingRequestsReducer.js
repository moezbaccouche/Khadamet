const initialState = {
  pendingRequests: [],
};

export default function editPendingRequests(state = initialState, action) {
  let nextState = {};
  switch (action.type) {
    case 'SET_PENDING_REQUEST':
      const pendingReq = state.pendingRequests.find(
        (item) => item.id === action.value.id,
      );
      if (pendingReq === undefined) {
        nextState = {
          ...state,
          pendingRequests: [...state.pendingRequests, action.value],
        };
      } else {
        let newPendingRequests = [...state.pendingRequests];
        const reqIndex = newPendingRequests.findIndex(
          (item) => item.id === action.value.id,
        );
        newPendingRequests[reqIndex] = action.value;
        nextState = {
          ...state,
          pendingRequests: [...newPendingRequests],
        };
      }
      return nextState || state;

    case 'REMOVE_PENDING_REQUEST':
      nextState = {
        ...state,
        pendingRequests: state.pendingRequests.filter(
          (item) => item.id !== action.value.id,
        ),
      };

      return nextState || state;

    default:
      return state;
  }
}
