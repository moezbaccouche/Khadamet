const initialState = {
  acceptedRequests: [],
};

export default function editAcceptedRequests(state = initialState, action) {
  let nextState = {};
  switch (action.type) {
    case 'SET_ACCEPTED_REQUEST':
      const acceptedReq = state.acceptedRequests.find(
        (item) => item.id === action.value.id,
      );
      if (acceptedReq === undefined) {
        nextState = {
          ...state,
          acceptedRequests: [...state.acceptedRequests, action.value],
        };
      } else {
        let newAcceptedRequests = [...state.acceptedRequests];
        const reqIndex = newAcceptedRequests.findIndex(
          (item) => item.id === action.value.id,
        );
        newAcceptedRequests[reqIndex] = action.value;
        nextState = {
          ...state,
          acceptedRequests: [...newAcceptedRequests],
        };
      }
      return nextState || state;

    case 'REMOVE_ACCEPTED_REQUEST':
      nextState = {
        ...state,
        acceptedRequests: state.acceptedRequests.filter(
          (item) => item.id !== action.value.id,
        ),
      };

      return nextState || state;

    default:
      return state;
  }
}
