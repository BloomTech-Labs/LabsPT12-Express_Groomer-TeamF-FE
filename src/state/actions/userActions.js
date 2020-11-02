import { INITIALIZE_USER } from './userActionTypes';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import {
  POST_USERID_INITIAL,
  POST_USERID_SUCCESS,
  POST_USERID_FAILURE,
} from './userActionTypes';
import {
  POST_PROFILE_INITIAL,
  POST_PROFILE_SUCCESS,
  POST_PROFILE_FAILURE,
} from './userActionTypes';

export const initializeUser = (authService, history) => async dispatch => {
  try {
    var user = await authService.getUser();
  } catch (err) {
    console.log(err);
  }

  if (!authService.getAuthState().isAuthenticated) return;
  const { sub, email } = user;

  dispatch({
    type: INITIALIZE_USER,
    payload: {
      initialized: true,
      okta_uid: sub,
      email,
    },
  });
};

export const postUserId = userId => async dispatch => {
  dispatch({ type: POST_USERID_INITIAL, payload: true });
  try {
    dispatch({ type: POST_USERID_SUCCESS, payload: userId });
  } catch (err) {
    dispatch({ type: POST_USERID_FAILURE, payload: err });
  }
};

export const postProfile = userData => async dispatch => {
  dispatch({ type: POST_PROFILE_INITIAL, payload: true });
  try {
    console.log('also here');
    dispatch({ type: POST_PROFILE_SUCCESS, payload: userData });
  } catch (err) {
    dispatch({ type: POST_PROFILE_FAILURE, payload: err });
  }
};
