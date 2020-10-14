import { INITIALIZE_USER } from './userActionTypes';

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
