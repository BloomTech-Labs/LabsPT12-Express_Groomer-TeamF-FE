import produce from 'immer';

import {
  POST_PROFILE_INITIAL,
  POST_PROFILE_SUCCESS,
  EDIT_PROFILE_SUCCESS,
  POST_PROFILE_FAILURE,
} from '../actions/userActionTypes';

const initialState = {
  loading: false,
  userData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_PROFILE_INITIAL:
      return produce(state, draft => {
        draft.loading = true;
      });
    case POST_PROFILE_SUCCESS:
      return produce(state, draft => {
        console.log('>>>>>>>>>', action.payload);
        draft.loading = false;
        draft.userData = action.payload;
      });
    case EDIT_PROFILE_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.userData.email = action.payload.email;
        draft.userData.preferred_username = action.payload.preferred_username;
        draft.userData.family_name = action.payload.family_name;
      });
    case POST_PROFILE_FAILURE:
      return produce(state, draft => {
        draft.register = action.payload;
      });
    default:
      return state;
  }
};
