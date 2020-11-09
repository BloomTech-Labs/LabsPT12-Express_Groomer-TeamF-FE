// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

import { combineReducers } from 'redux';

import userReducer from './userReducer';
import UserIdReducer from './UserIdReducer';
import postProfileReducer from './postProfileReducer';

export default combineReducers({
  userReducer,
  UserIdReducer,
  postProfileReducer,
});
