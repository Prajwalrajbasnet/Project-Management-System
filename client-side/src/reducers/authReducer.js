import { LOGIN_USER, LOGOUT_USER, SET_USER } from '../constants/actionNames';

const INITIAL_STATE = {
  isLoggedIn: false,
  user: {},
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLoggedIn: true };
    case LOGOUT_USER:
      return { ...state, isLoggedIn: false, user: {} };
    case SET_USER:
      return {...state, user: action.payload}
    default:
      return state;
  }
}
