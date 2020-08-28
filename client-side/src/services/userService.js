import http, { getAuthenticationHeader } from '../utils/httpUtil';
import config from '../config';
class UserService {
  getCurrentUser() {
    return http.get(`${config.endpoints.users}/current`, { headers: getAuthenticationHeader() });
  }

  getAllUsers() {
    return http.get(`${config.endpoints.users}`, { headers: getAuthenticationHeader() });
  }
  createUser(data) {
    return http.post(`${config.endpoints.users}`, data, { headers: getAuthenticationHeader() });
  }

  updateUser(id, data) {
    return http.put(`${config.endpoints.users}/${id}`, data, { headers: getAuthenticationHeader() });
  }
  deleteUser(id) {
    return http.delete(`${config.endpoints.users}/${id}`, { headers: getAuthenticationHeader() });
  }
}
export default new UserService();
