import { LOGIN_USER, LOGOUT_USER, SET_USER } from '../constants/actionNames';
import UserService from '../services/userService';

export function loginUser() {
  return {
    type: LOGIN_USER,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function fetchUser() {
  return (dispatch) => {
    return UserService.getCurrentUser()
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((err) => {
        throw err;
      });
  };
}
