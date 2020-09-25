const initialState = {
  treatedRequests: [],
};

export default function editTreatedRequests(state = initialState, action) {
  let nextState = {};
  switch (action.type) {
    case 'SET_TREATED_REQUEST':
      const treatedReq = state.treatedRequests.find(
        (item) => item.id === action.value.id,
      );
      if (treatedReq === undefined) {
        nextState = {
          ...state,
          treatedRequests: [...state.treatedRequests, action.value],
        };
      } else {
        let newTreatedRequests = [...state.treatedRequests];
        const reqIndex = newTreatedRequests.findIndex(
          (item) => item.id === action.value.id,
        );
        newTreatedRequests[reqIndex] = action.value;
        nextState = {
          ...state,
          treatedRequests: [...newTreatedRequests],
        };
      }
      return nextState || state;

    default:
      return state;
  }
}
