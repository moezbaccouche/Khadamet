const initialState = {conversationsOverview: []};

export default function editConversationsOverview(
  state = initialState,
  action,
) {
  let nextState;
  switch (action.type) {
    case 'EDIT_OVERVIEW':
      const overview = state.conversationsOverview.find(
        (item) => item.conversationId === action.value.conversationId,
      );
      overview.lastMessage = action.value.lastMessage;
      nextState = {
        ...state,
        conversationsOverview: state.conversationsOverview,
      };
      return nextState || state;

    default:
      return state;
  }
}
