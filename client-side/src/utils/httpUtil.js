import axios from 'axios';
import config from '../config';

export default axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export function getAuthenticationHeader() {
  const user = JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_KEY));
  if (user && user.token) {
    return {
      Authentication: user.token,
      'Content-type': 'application/json',
    };
  } else {
    return {};
  }
}
