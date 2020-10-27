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
    console.log('HIIII', userId);
    dispatch({ type: POST_USERID_SUCCESS, payload: userId });
  } catch (err) {
    console.log('SSS', userId);
    dispatch({ type: POST_USERID_FAILURE, payload: err });
  }
};

export const postProfile = (userData, history) => dispatch => {
  dispatch({ type: POST_PROFILE_INITIAL });
  axiosWithAuth()
    .post('/profiles', userData)
    .then(response => {
      dispatch({ type: POST_PROFILE_SUCCESS, payload: response.data });
      // history.push("/yourjobs"); //  <<< Want to use the push depending on what we want to do after uses registers the profile
      // localStorage.setItem('id', response.data.user_id)
    })
    .catch(error => {
      console.log('ERROR in PROFILE DATA', error);
      dispatch({ type: POST_PROFILE_FAILURE, payload: error });
    });
};
