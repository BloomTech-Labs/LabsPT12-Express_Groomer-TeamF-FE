import {
  POST_USERID_INITIAL,
  POST_USERID_SUCCESS,
  POST_USERID_FAILURE,
} from '../actions/userActionTypes';

const initialState = {
  loading: false,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_USERID_INITIAL:
      return {
        ...state,
        loading: true,
      };
    case POST_USERID_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.payload,
      };
    case POST_USERID_FAILURE:
      return {
        ...state,
        userId: action.payload,
      };

    default:
      return state;
  }
};
