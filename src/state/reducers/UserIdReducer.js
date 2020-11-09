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

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_USERID_INITIAL:
      return produce(state, draft => {
        draft.loading = true;
      });
    case POST_USERID_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.userId = action.payload;
      });
    case POST_USERID_FAILURE:
      return produce(state, draft => {
        draft.userId = action.payload;
      });
    default:
      return state;
  }
};
