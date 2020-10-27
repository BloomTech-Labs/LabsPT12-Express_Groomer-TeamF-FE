import produce from 'immer';

import {
  POST_PROFILE_INITIAL,
  POST_PROFILE_SUCCESS,
  POST_PROFILE_FAILURE,
} from '../actions/userActionTypes';

const initialState = {
  loading: false,
  userData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_PROFILE_INITIAL:
      return {
        ...state,
        loading: true,
      };
    case POST_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    case POST_PROFILE_FAILURE:
      return {
        ...state,
        register: action.payload,
      };
    default:
      return state;
  }
};
