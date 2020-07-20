import { combineReducers } from 'redux';
import { taskReducer } from './tasksReducer';
import { messagesReducer } from './messagesReducer';

const mainReducer = combineReducers({
    tasks: taskReducer,
    messages: messagesReducer
});

export default mainReducer;
