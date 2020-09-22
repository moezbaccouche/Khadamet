const initialState = {conversationsOverview: []};

export default function editConversationsOverview(
  state = initialState,
  action,
) {
  let nextState;
  switch (action.type) {
    case 'ADD_OVERVIEW':
      const overview = state.conversationsOverview.find(
        (item) => item.conversationId === action.value.conversationId,
      );
      if (overview === undefined) {
        //If it's the first message of the conversation
        nextState = {
          ...state,
          conversationsOverview: [...state.conversationsOverview, action.value],
        };
      } else {
        //If the conversation already exists, we have to edit the last message
        let newOverviewsArray = [...state.conversationsOverview];
        const index = newOverviewsArray.findIndex(
          (item) => item.conversationId === action.value.conversationId,
        );
        newOverviewsArray[index].lastMessage = action.value.lastMessage;

        nextState = {
          ...state,
          conversationsOverview: [...newOverviewsArray],
        };
      }
      return nextState || state;

    default:
      return state;
  }
}
