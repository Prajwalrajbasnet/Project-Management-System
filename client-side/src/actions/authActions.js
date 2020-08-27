import { LOGIN_USER, LOGOUT_USER } from '../constants/actionNames';

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
