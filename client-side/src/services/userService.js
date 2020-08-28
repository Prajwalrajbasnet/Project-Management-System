import http, { getAuthenticationHeader } from '../utils/httpUtil';
import config from '../config';
class UserService {
  getCurrentUser() {
    return http.get(`${config.endpoints.users}/current`, { headers: getAuthenticationHeader() });
  }
}
export default new UserService();
