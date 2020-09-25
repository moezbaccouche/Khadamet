const initialState = {
  myRequests: [],
};

export default function editMyRequests(state = initialState, action) {
  let nextState = {};
  switch (action.type) {
    case 'SET_MY_REQUEST':
      const treatedReq = state.myRequests.find(
        (item) => item.id === action.value.id,
      );
      if (treatedReq === undefined) {
        nextState = {
          ...state,
          myRequests: [...state.myRequests, action.value],
        };
      } else {
        let newMyRequests = [...state.myRequests];
        const reqIndex = newMyRequests.findIndex(
          (item) => item.id === action.value.id,
        );
        newMyRequests[reqIndex] = action.value;
        nextState = {
          ...state,
          myRequests: [...newMyRequests],
        };
      }
      return nextState || state;

    default:
      return state;
  }
}
