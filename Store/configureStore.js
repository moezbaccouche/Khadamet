import {createStore, combineReducers} from 'redux';
import editConversationsOverview from './reducers/conversationReducer';
import setLoggedUser from './reducers/loggedUserReducer';
import editPendingRequests from './reducers/pendingRequestsReducer';
import editAcceptedRequests from './reducers/acceptedRequestsReducer';
import editTreatedRequests from './reducers/treatedRequestsReducer';
import editMyRequests from './reducers/myRequestsReducer';

export default createStore(
  combineReducers({
    editConversationsOverview,
    setLoggedUser,
    editPendingRequests,
    editAcceptedRequests,
    editTreatedRequests,
    editMyRequests,
  }),
);
