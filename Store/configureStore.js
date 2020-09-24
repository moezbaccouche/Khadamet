import {createStore, combineReducers} from 'redux';
import editConversationsOverview from './reducers/conversationReducer';
import setLoggedUser from './reducers/loggedUserReducer';

export default createStore(
  combineReducers({editConversationsOverview, setLoggedUser}),
);
