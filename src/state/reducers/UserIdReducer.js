import produce from 'immer';

import {
  POST_USERID_INITIAL,
  POST_USERID_SUCCESS,
  POST_USERID_FAILURE,
} from '../actions/userActionTypes';

const initialState = {
  loading: false,
  userId: null,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_USERID_INITIAL:
        draft.loading = true;
      case POST_USERID_SUCCESS:
        draft.userId = action.payload;
        draft.loading = false;
      case POST_USERID_FAILURE:
        draft.userId = action.payload;
      default:
        return state;
    }
  });
