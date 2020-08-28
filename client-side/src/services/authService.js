import http from '../utils/httpUtil';
import config from '../config';
class AuthService {
  login(username, password) {
    return http
      .post(`${config.endpoints.auth}/login`, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem(config.LOCAL_STORAGE_KEY, JSON.stringify(response.data));
          return response.data.user;
        }
      })
      .catch((error) => error);
  }

  logout() {
    localStorage.removeItem(config.LOCAL_STORAGE_KEY);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_KEY));
  }

  getAuthenticationToken() {
    const user = JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_KEY));
    console.log(user);
    if (user && user.token) {
      return user.token;
    } else {
      return '';
    }
  }
}
export default new AuthService();
