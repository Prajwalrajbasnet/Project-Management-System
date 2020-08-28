import http, { getAuthenticationHeader } from '../utils/httpUtil';
import config from '../config';
class ProjectService {
  getAllProjects() {
    return http.get(`${config.endpoints.projects}`, { headers: getAuthenticationHeader() });
  }

  getSingleProject(id) {
    return http.get(`${config.endpoints.projects}/${id}`, { headers: getAuthenticationHeader() });
  }

  createProject(data) {
    return http.post(`${config.endpoints.projects}`, data, { headers: getAuthenticationHeader() });
  }

  updateProject(id, data) {
    return http.put(`${config.endpoints.projects}/${id}`, data, { headers: getAuthenticationHeader() });
  }
  deleteProject(id) {
    return http.delete(`${config.endpoints.projects}/${id}`, { headers: getAuthenticationHeader() });
  }
}
export default new ProjectService();
